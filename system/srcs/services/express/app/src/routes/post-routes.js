const post_router = require('express').Router()
const {auth_validation} = require('../middlewares/auth-middleware-validation');
const {
    createPost,
    fetchBlogPosts,
    getSpecificPost,
    deletePost,
    handlePostUpdate,
    handleClapping,
    handleUnclapping
} = require("../controllers/posts-controller");
const {validateNewPost, validatePostUpdate} = require("../middlewares/post-middleware");
const error_checker = require("../middlewares/error-checking-validator");

post_router.post("/", auth_validation, validateNewPost, error_checker, createPost);
post_router.post("/:postId/clap", auth_validation, handleClapping);
post_router.delete("/:postId/clap", auth_validation, handleUnclapping);
post_router.get('/of/:blog_id', fetchBlogPosts);
post_router.get('/:post_id', getSpecificPost);
post_router.delete("/:post_id", auth_validation, deletePost);
post_router.patch("/:post_id", auth_validation, validatePostUpdate, error_checker, handlePostUpdate);
module.exports = post_router ;