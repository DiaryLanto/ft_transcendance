const {body} = require('express-validator')

const blogValidator = [
    body('name')
    .trim()
    .isLength({min:5, max: 20})
    .withMessage("Blog name should contain 5 to 20 characters")
];

const validateBlogUpdate = [
body('name')
    .optional()
    .trim()
    .isLength({min:5, max: 20})
    .withMessage("Blog name should contain 5 to 20 characters"),
body('description')
    .optional()
    .trim()
];
module.exports = {
    blogValidator,
    validateBlogUpdate
};