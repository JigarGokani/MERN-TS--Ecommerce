import express from "express"
import userRoute from "./routes/user.js"
import {dbConnect} from './utils/features.js'
import { errorMiddleware } from "./middlewares/error.js";
const app = express();

app.use(express.json())

const port = 4000
dbConnect();

// Mounting Routes
app.use("/api/v1/user",userRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to the default route")
})





app.use(errorMiddleware);
app.listen(port,()=>{
    console.log(`App listening at the port ${port}`)
})
 
   