const {body} = require('express-validator')

const validateNewUser = [
    body('login')
        .trim()
        .isLength({min:3, max:10})
        .withMessage("Login should contain 3 to 10 char"),
    body('passwd')
        .trim()
        .notEmpty()
        .withMessage("Password should not be empty"),
    body('confirm')
        .custom((value, { req }) => value === req.body.passwd)
        .withMessage("Password and confirmaton should match"),
    body('email')
        .trim()
        .isEmail()
        .withMessage("Invalid mail")
        .normalizeEmail()
];

//what could we update
const validateUserUpdate = [
    body("date_of_birth")
        .optional({values: 'falsy'}),
    body("bio")
        .optional({values: 'falsy'}),
    body("phone")
        .optional({values: 'falsy'}),
    body("address")
        .optional({values: 'falsy'})
];
module.exports = {
    validateNewUser,
    validateUserUpdate
};