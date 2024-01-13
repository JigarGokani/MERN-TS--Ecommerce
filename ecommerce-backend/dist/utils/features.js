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
export const invalidateCache = async ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object")
            productId.forEach((i) => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const ordersKeys = ["all-orders", `my-orders-${userId}`, `order-${orderId}`];
        myCache.del(ordersKeys);
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
