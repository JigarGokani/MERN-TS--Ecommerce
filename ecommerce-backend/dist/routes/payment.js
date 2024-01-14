import express from "express";
import { isAdmin } from "../middlewares/isAuth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupon } from "../controllers/payment.js";
const app = express.Router();
app.post("/coupon/new", isAdmin, newCoupon);
app.get("/discount", applyDiscount);
app.get("/coupon/all", isAdmin, allCoupons);
app.delete("/coupon/:id", isAdmin, deleteCoupon);
export default app;
