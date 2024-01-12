import express from "express";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import { dbConnect } from './utils/features.js';
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
const app = express();
app.use(express.json());
const port = 4000;
dbConnect();
export const myCache = new NodeCache();
// Mounting Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.get("/", (req, res) => {
    res.send("Welcome to the default route");
});
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`App listening at the port ${port}`);
});
