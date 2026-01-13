const {body} = require("express-validator");

const commentValidator = [
    body("post")
    .trim()
    .notEmpty()
    .withMessage("Request uncomplete"),
    body("content")
    .trim()
    .notEmpty()
    .withMessage("Should contain message")
];

module.exports = commentValidator;