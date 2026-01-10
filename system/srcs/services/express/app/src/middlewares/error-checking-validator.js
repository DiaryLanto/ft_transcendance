const {validationResult} = require ('express-validator')

const error_checker = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        console.log("Error are not empty");
        return res.status(400).json({errors: errors.array() });
    }
    next();
}
module.exports = error_checker;