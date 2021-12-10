const ErrorHandler = require("../utils/errorhander");

module.exports = (err,res,req,next) =>{
    err.statusCode = err.statusCode || 500;
    err.statusCode = err.message || "Internal server error";

    res.status(err.statusCode).json({
        success: false,
        error : err.massage,
    });
};