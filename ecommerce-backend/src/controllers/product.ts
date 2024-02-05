import { v2 as cloudinary } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from '../types/types.js';
import { Product } from '../models/product.js';
import ErrorHandler from '../utils/utility-class.js';
import { rm } from 'fs';
import { myCache } from '../app.js';
import { invalidateCache } from '../utils/features.js';
import { error } from 'console';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const newProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res: Response, next: NextFunction) => {
  const { name, category, price, stock } = req.body;
  const photo = req.file;

  if (!photo) return next(new ErrorHandler('Please add the photo', 400));

  if (!name || !category || !price || !stock) {
    rm(photo.path, () => {
      console.log('Deleted');
    });
    return next(new ErrorHandler('Please enter all the fields', 400));
  }

  try {
    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.path, { folder: "CodeHelp"});

    // Create product with Cloudinary secure URL
    const product = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo:cloudinaryResponse.secure_url,
        
    });

    // Invalidate cache
    invalidateCache({ product: true, admin: true });

    res.status(201).json({
      success: true,
      product,
      message: 'Product Created successfully!',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return next(new ErrorHandler('Internal Server Error', 500));
  } finally {
    // Delete the local file after it's successfully uploaded to Cloudinary
    rm(photo.path, () => {
      console.log('Local file deleted');
    });
  }
});


// Revalidate on NEW,UPDATE,DELETE PRODUCT & on the NEW ORDER 
export const getLatestProduct = TryCatch(async(req,res,next)=>{


    let products;

    if(myCache.has("latest-products")) 
    products = JSON.parse(myCache.get("latest-products") as string);

    else{
        products = await Product.find({}).sort({createdAt:-1}).limit(5);

        // yaha par db se products milne ke baad hum humare cache-memory me store karege jisse dusri baar user ke request marne par hum direct cache memory mese hi data dedenge (fast processing)
        myCache.set("latest-products",JSON.stringify(products))

    }




    res.status(200).json({
        success:true,
        products
    })
})

// Revalidate on NEW,UPDATE,DELETE PRODUCT & on the NEW ORDER 

export const getAllCategories = TryCatch(async(req,res,next)=>{

    let Categories;
    if(myCache.has("categories")) 
    Categories =  JSON.parse(myCache.get("categories") as string);

    else{
        Categories = await Product.distinct("category")
        myCache.set("categories",JSON.stringify(Categories))
    }

    


    res.status(200).json({
        success:true,
        Categories
    })
})

// Revalidate on NEW,UPDATE,DELETE PRODUCT & on the NEW ORDER 

export const getAdminProducts = TryCatch(async(req,res,next)=>{

    let products;
    if(myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products") as string)

    else{
        products = await Product.find({});
        myCache.set("all-products",JSON.stringify(products))
    }


    res.status(200).json({
        success:true,
        products
    })
})

// Revalidate on NEW,UPDATE,DELETE PRODUCT & on the NEW ORDER 

 
export const getSingleProduct = TryCatch(async(req,res,next)=>{
    let product;
    const id = req.params.id;

    if(myCache.has(`product-${id}`))
    product = JSON.parse(myCache.get(`product-${id}`) as string)

    else{
        product = await Product.findById(id)

        if(!product) return next(new ErrorHandler("Invalid Product ID",404))

        myCache.set(`product-${id}`,JSON.stringify(product));

    }



    res.status(200).json({
        success:true,
        product
    })
})


export const updateProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const { name, category, price, stock } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Invalid Product ID", 404));

    try {
        if (photo) {
            // If there is a new photo, upload it to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(photo.path, { folder: "CodeHelp" });
            
            // Update product with the new Cloudinary secure URL
            product.photo = cloudinaryResponse.secure_url; // Semicolon added here
        }

        // Update other fields if provided
        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (category) product.category = category;

        await product.save();

        // Invalidate cache
        invalidateCache({ product: true, admin: true, productId: String(product._id) });

        res.status(201).json({
            success: true,
            message: "Product Updated successfully!",
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return next(new ErrorHandler("Internal Server Error", 500));
    } finally {
        // Delete the local file after it's successfully uploaded to Cloudinary
        if (photo) {
            rm(photo.path, () => {
                console.log("Local file deleted");
            });
        }
    }
});




export const deleteProduct = TryCatch(async(req,res,next)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product) return next(new ErrorHandler("Product Not found",404));

    rm(product.photo!, ()=>{
        console.log("Product Photo Deleted Permanently!")
    })

    await product.deleteOne();

    invalidateCache({product:true,admin:true,productId: String(product._id)});


    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully!"

    })

})

export const filteredData = TryCatch(async(
    req:Request<{},{},{},SearchRequestQuery>,
    res,
    next,
)=>{

const {search,price,category,sort} = req.query;

const page = Number(req.query.page) || 1;

const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
const skip = (page - 1) * limit;


const baseQuery:BaseQuery = {}


if(search) 
baseQuery.name = {
    $regex:search,
    $options:"i",
}

if(price) 
baseQuery.price = {
    $lte:Number(price),
}

if(category) 
baseQuery.category = category




// Ye 2 await lerha he toh hum Promise.all use karege jisse dono await parallely execute hojayege

// const products = await Product.find(baseQuery)
//                 .sort(sort && {price: sort === "asc" ? 1 : -1})
//                 .limit(limit)
//                 .skip(skip);



// const filteredOnlyProduct = await Product.find(baseQuery);

const[products,filteredOnlyProduct] = await Promise.all([
    Product.find(baseQuery)
    .sort(sort && {price: sort === "asc" ? 1 : -1})
    .limit(limit)
    .skip(skip),
    Product.find(baseQuery)        

])

const totalPage = Math.ceil(filteredOnlyProduct.length / limit);


res.status(200).json({
    success:true,
    products,
    totalPage,

})

})


// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\975fa220-4021-4804-a109-359d98c047a0.jpg",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };



// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };

