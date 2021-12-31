const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    // wrong Mongodb Id error
    if(err.name === "CastError")
     {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400); 
     }

     //Mongoose duplicate key error (time : 03:23:00)
     if(err.code === 11000){
         const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
         err = new ErrorHandler(message, 400);
     }

    // wrong JWT error (time : 03:24:14)
    if(err.name === "JsonWebTokenError")
    {
       const message = `Json Web Token is invalid, try again`;
       err = new ErrorHandler(message, 400); 
    }

    // wrong Expire error (time : 03:24:55)
    if(err.name === "JsonExpiredError")
        {
           const message = `Json Web Token is expired, try again`;
           err = new ErrorHandler(message, 400); 
        }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};