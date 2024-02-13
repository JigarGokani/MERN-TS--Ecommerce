import  express  from "express";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
import { isAdmin, isDemo } from "../middlewares/isAuth.js";

const app = express.Router();


app.post("/new",newOrder);
app.get("/my",myOrders);
app.get("/all",isAdmin,allOrders);
app.get("/:id",getSingleOrder);
app.put("/:id",isAdmin,processOrder);
app.delete("/:id",isAdmin,isDemo,deleteOrder);



export default app;