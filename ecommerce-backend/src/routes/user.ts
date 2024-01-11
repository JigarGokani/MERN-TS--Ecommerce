import  express  from "express";
import { getAllUser, newUser } from "../controllers/user.js";

const app = express.Router();


app.post("/new",newUser);
app.get("/all",getAllUser);


export default app;