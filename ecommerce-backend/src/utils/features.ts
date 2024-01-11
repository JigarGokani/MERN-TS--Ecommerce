import mongoose from "mongoose";
export const dbConnect = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce24',{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connected Successfully!")})
    .catch((error)=>{
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}

