const {body} = require('express-validator')

const blogValidator = [
    body('name')
    .trim()
    .isLength({min:5, max: 20})
    .withMessage("Blog name should contain 5 to 20 characters")
];

module.exports = blogValidator;