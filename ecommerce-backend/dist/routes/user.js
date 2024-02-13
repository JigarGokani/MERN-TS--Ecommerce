import express from "express";
import { deleteUser, getAllUser, getUser, newUser } from "../controllers/user.js";
import { isAdmin, isDemo } from "../middlewares/isAuth.js";
const app = express.Router();
app.post("/new", newUser);
app.get("/all", isAdmin, getAllUser);
app.get("/:id", getUser);
app.delete("/:id", isAdmin, isDemo, deleteUser);
export default app;
