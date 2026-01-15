const errorHandler = (err, req, res, next) => {
    if (err.isAppError){
        console.error(err);
        return (res.status(err.statusCode).json({error : err.message}));
    }
    console.log(err);
    res.status(500).json({error: "Internal server error"});
}

module.exports = errorHandler;