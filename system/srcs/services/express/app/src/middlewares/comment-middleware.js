const {body, param} = require("express-validator");

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

const commentParamValidator = [
    param('post_id')
    .notEmpty()
    .withMessage("Unknown post")
]

const validateCommentUpdate = [
    body("content")
    .trim()
    .notEmpty()
    .withMessage("content should not be empty")
];
module.exports = {
    commentValidator,
    commentParamValidator,
    validateCommentUpdate
};