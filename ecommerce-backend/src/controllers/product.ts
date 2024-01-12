import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
// import { faker } from "@faker-js/faker";


export const newProduct = TryCatch(async(
    req:Request<{},{},NewProductRequestBody>,
    res:Response,
    next:NextFunction
    )=>{

        const {name,category,price,stock} =req.body;
        const photo = req.file;

        if(!photo) return next(new ErrorHandler("Please add the photo",400));


        if(!name || !category || !price || !stock) 
        {
            rm(photo.path,()=>{
                console.log("Deleted");
            });
            return next(new ErrorHandler("Please enter all the feilds",400));
        }


       const product= await Product.create({
            name,
            price,
            stock,
            category:category.toLowerCase(),
            photo:photo?.path,

        })


        res.status(201).json({
            success:true,
            product,
            message:"Product Created successfully!"
        })


})

export const getLatestProduct = TryCatch(async(req,res,next)=>{

    const product = await Product.find({}).sort({createdAt:-1}).limit(5);


    res.status(200).json({
        success:true,
        product
    })
})

export const getAllCategories = TryCatch(async(req,res,next)=>{

    const Categories = await Product.distinct("category")


    res.status(200).json({
        success:true,
        Categories
    })
})

export const getAdminProducts = TryCatch(async(req,res,next)=>{

    const product = await Product.find({});


    res.status(200).json({
        success:true,
        product
    })
})

export const getSingleProduct = TryCatch(async(req,res,next)=>{

    const id = req.params.id;
    const product = await Product.findById(id)


    if(!product) return next(new ErrorHandler("Invalid Product ID",404))

    res.status(200).json({
        success:true,
        product
    })
})


export const updateProduct = TryCatch(async(req,res,next)=>{

        const id = req.params.id;
        const {name,category,price,stock} =req.body;
        const photo = req.file;


        const product = await Product.findById(id);

        if(!product) return next(new ErrorHandler("Invalid Product ID",404))


        if(photo) 
        {
            rm(product.photo!,()=>{
                console.log("Old Photo Deleted");
            });
            product.photo = photo.path;
        }


       if(name) product.name = name;
       if(price) product.price = price;
       if(stock) product.stock = stock;
       if(category) product.category = category;


        await product.save();

        res.status(201).json({
            success:true,
            message:"Product Updated successfully!"
        })


})


export const deleteProduct = TryCatch(async(req,res,next)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product) return next(new ErrorHandler("Product Not found",404));

    rm(product.photo!, ()=>{
        console.log("Product Photo Deleted Permanently!")
    })

    await product.deleteOne();

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
