import express from "express";
import { deleteUser, getAllUser, getUser, newUser } from "../controllers/user.js";
const app = express.Router();
app.post("/new", newUser);
app.get("/all", getAllUser);
app.get("/:id", getUser);
app.delete("/:id", deleteUser);
export default app;
