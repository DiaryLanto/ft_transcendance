class AppError extends Error {
    constructor (statusCode, errorMessage) {
        super (errorMessage);
        this.statusCode = statusCode;
        this.isAppError = true;
    }
}

module.exports = AppError;