import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
import { error } from "console";
import { Order } from "../models/order.js";
export const dbConnect = (url:string) =>{
    mongoose.connect(url,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connected Successfully!")})
    .catch((error)=>{
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}


export const invalidateCache = async({
    product,
    order,
    admin,
    userId,
    orderId,
    productId,
  }: InvalidateCacheProps) => {
    if (product) {
      const productKeys: string[] = [
        "latest-products",
        "categories",
        "all-products",
      ];
  
      if (typeof productId === "string") productKeys.push(`product-${productId}`);

      if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${i}`));

  
      myCache.del(productKeys);
    }
    if(order){
      const ordersKeys:string[] = ["all-orders",`my-orders-${userId}`,`order-${orderId}`]

      myCache.del(ordersKeys);
    }

  };


  export const reduceStock =  async(orderItem:OrderItemType[])=>{

    for (let i = 0; i < orderItem.length; i++) {

      const order = orderItem[i];

      const product = await Product.findById(order.productId);

      if(!product) throw new Error ("Product Not Found")

      product.stock -= order.quantity;

      await product.save();

      
    }

  }

  export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
    if (lastMonth === 0) return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
  };


  export const getInventories = async ({
    categories,
    productsCount,
  }: {
    categories: string[];
    productsCount: number;
  }) => {
    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );
  
    const categoriesCount = await Promise.all(categoriesCountPromise);
  
    const categoryCount: Record<string, number>[] = [];
  
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / productsCount) * 100),
      });
    });
  
    return categoryCount;
  };