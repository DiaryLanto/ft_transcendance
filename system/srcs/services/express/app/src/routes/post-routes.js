const post_router = require('express').Router()
const auth_validator = require('../middlewares/auth-middleware-validation');
const {createPost, fetchBlogPosts, getSpecificPost, deletePost, handlePostUpdate, handleClapping} = require("../controllers/posts-controller");
const {validateNewPost, validatePostUpdate} = require("../middlewares/post-middleware");
const error_checker = require("../middlewares/error-checking-validator");

post_router.post("/", auth_validator, validateNewPost, error_checker, createPost);
post_router.post("/:postId/clap", auth_validator, handleClapping);
post_router.get('/of/:blog_id', fetchBlogPosts);
post_router.get('/:post_id', getSpecificPost);
post_router.delete("/:post_id", auth_validator, deletePost);
post_router.patch("/:post_id", auth_validator, validatePostUpdate, error_checker, handlePostUpdate);
module.exports = post_router ;