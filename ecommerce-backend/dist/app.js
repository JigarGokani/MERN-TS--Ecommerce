import express from "express";
import userRoute from "./routes/user.js";
const app = express();
const port = 4000;
// Mounting Routes
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
    console.log(`App listening at the port ${port}`);
});
