const errorHandler = (err, req, res, next) => {
    if (err.isAppError){
        return (res.status(error.statusCode).json({error : err.message}));
    }
    res.status(500).json({error: "Internal server error"});
}

module.exports = errorHandler;