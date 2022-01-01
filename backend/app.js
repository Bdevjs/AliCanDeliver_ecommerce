const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute"); // step 4.1
const order = require("./routes/orderRoute"); //time:4:18:37


app.use("/api/v1",product); //api for poroducts
app.use("/api/v1", user); //api for registration user ___ step 4.2
app.use("/api/v1",order);//time:4:18:50 // Api for order


//Middleware for errors
app.use(errorMiddleware);

module.exports = app