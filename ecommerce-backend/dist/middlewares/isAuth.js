import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
export const isAdmin = TryCatch(async (req, res, next) => {
    const id = req.query.id || req.params.id;
    console.log(id);
    if (!id) {
        return next(new ErrorHandler("You are not logedin user", 402));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid ID", 402));
    }
    if (user.role !== "admin") {
        return next(new ErrorHandler("You don't have any rights(Admin protected route)", 402));
    }
    next();
});
export const isDemo = TryCatch(async (req, res, next) => {
    const id = req.query.id || req.params.id;
    console.log(id);
    if (!id) {
        return next(new ErrorHandler("You are not logedin user", 402));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid ID", 402));
    }
    if (user.role !== "admin") {
        return next(new ErrorHandler("You don't have any rights(Admin protected route)", 402));
    }
    if (user.email === "jigargokani100@gmail.com") {
        return next(new ErrorHandler("This is Demo User!", 402));
    }
    next();
});
