import express from "express";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import { dbConnect } from './utils/features.js';
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
config({
    path: "./.env"
});
const app = express();
app.use(express.json());
app.use(morgan("dev"));
const port = process.env.PORT || 6000;
const mongoURL = process.env.MONGO_URL || "";
dbConnect(mongoURL);
export const myCache = new NodeCache();
// Mounting Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.get("/", (req, res) => {
    res.send("Welcome to the default route");
});
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`App listening at the port ${port}`);
});
