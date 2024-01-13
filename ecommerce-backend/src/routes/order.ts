import  express  from "express";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
import { isAdmin } from "../middlewares/isAuth.js";

const app = express.Router();


app.post("/new",newOrder);
app.get("/my",myOrders);
app.get("/all",isAdmin,allOrders);
app.get("/:id",getSingleOrder);
app.put("/:id",isAdmin,processOrder);
app.delete("/:id",isAdmin,deleteOrder);



export default app;