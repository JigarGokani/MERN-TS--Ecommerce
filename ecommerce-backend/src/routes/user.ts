import  express  from "express";
import { newuser } from "../controllers/user.js";

const app = express.Router();


app.post("/new",newuser);


export default app;