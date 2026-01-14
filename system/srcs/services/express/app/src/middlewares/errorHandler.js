const errorHandler = (err, req, res, next) => {
    if (err.isAppError){
        console.error(err);
        return (res.status(err.statusCode).json({error : err.message}));
    }
    res.status(500).json({error: "Internal server error"});
}

module.exports = errorHandler;