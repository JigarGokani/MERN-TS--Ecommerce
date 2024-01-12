import  express  from "express";
import { isAdmin } from "../middlewares/isAuth.js";
import { deleteProduct, filteredData, getAdminProducts, getAllCategories, getLatestProduct, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();


app.post("/new",isAdmin,singleUpload,newProduct)

app.get("/latest",getLatestProduct)

app.get("/searchall",filteredData)

app.get("/category",getAllCategories)

app.get("/admin-products",isAdmin,getAdminProducts)


app.get("/:id",getSingleProduct)
app.put("/:id",isAdmin,singleUpload,updateProduct);
app.delete("/:id",isAdmin,deleteProduct);


export default app;