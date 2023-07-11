const ErrorHandler = require("../utils/ErrorHandler");
module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message  = err.message || "Interval server error"

    //mongodb
    if (err.name === "CastError") {
        const message = `Resources not found with this id..Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        error:err.message
    });
}

