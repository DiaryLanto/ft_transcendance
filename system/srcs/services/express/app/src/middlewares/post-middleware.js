const {body} = require('express-validator');

const postValidator = [
body("title")
    .trim()
    .notEmpty()
    .withMessage("post title should not empty"),
body("content")
    .trim()
    .notEmpty()
    .withMessage("post content should not empty"),
body("blog")
    .trim()
    .notEmpty()
    .withMessage("Error on you request")
]

module.exports = postValidator;