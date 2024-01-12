import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
export const dbConnect = (url) => {
    mongoose.connect(url, {
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    })
        .then(() => { console.log("DB connected Successfully!"); })
        .catch((error) => {
        console.log(error);
        console.error(error);
        process.exit(1);
    });
};
export const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        const products = await Product.find({}).select("_id");
        products.forEach((i) => { productKeys.push(`product-${i._id}`); });
        myCache.del(productKeys);
    }
};
export const reduceStock = async (orderItem) => {
    for (let i = 0; i < orderItem.length; i++) {
        const order = orderItem[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};
