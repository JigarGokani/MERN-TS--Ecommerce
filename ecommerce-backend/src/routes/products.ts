import  express  from "express";
import { isAdmin, isDemo } from "../middlewares/isAuth.js";
import { deleteProduct, filteredData, getAdminProducts, getAllCategories, getLatestProduct, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();


app.post("/new",isAdmin,isDemo,singleUpload,newProduct)

app.get("/latest",getLatestProduct)

app.get("/searchall",filteredData)

app.get("/categories",getAllCategories)

app.get("/admin-products",isAdmin,getAdminProducts)


app.get("/:id",getSingleProduct)
app.put("/:id",isAdmin,isDemo,singleUpload,updateProduct);
app.delete("/:id",isAdmin,isDemo,deleteProduct);


export default app;