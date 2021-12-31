const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute"); // step 4.1

app.use("/api/v1",product); //api for poroducts
app.use("/api/v1", user); //api for registration user ___ step 4.2



//Middleware for errors
app.use(errorMiddleware);

module.exports = app