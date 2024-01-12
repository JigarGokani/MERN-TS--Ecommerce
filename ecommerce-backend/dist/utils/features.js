import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
export const dbConnect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce24', {
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
