const comment_router = require('express').Router();
const {auth_validation} = require('../middlewares/auth-middleware-validation');
const {commentValidator, commentParamValidator, validateCommentUpdate} = require('../middlewares/comment-middleware');
const error_checker = require('../middlewares/error-checking-validator');
const {createPost, getCommentOfPost, handleCommentUpdate, handleCommentDeletion, handleGetCommentByUser, handleApproveComment} = require('../controllers/comments-controller');

comment_router.get("/of/:post_id", commentParamValidator, error_checker, getCommentOfPost);
comment_router.get("/by", auth_validation, handleGetCommentByUser);
comment_router.post("/", auth_validation, commentValidator, error_checker, createPost);
comment_router.patch("/:commentId/approve", auth_validation, handleApproveComment);
comment_router.patch("/:commentId", auth_validation, validateCommentUpdate, error_checker, handleCommentUpdate);
comment_router.delete("/:commentId", auth_validation, handleCommentDeletion);
module.exports = comment_router;