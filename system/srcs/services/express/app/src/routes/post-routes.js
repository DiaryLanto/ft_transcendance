const post_router = require('express').Router()
const auth_validator = require('../middlewares/auth-middleware-validation');
const {createPost, fetchBlogPosts, getSpecificPost, deletePost} = require("../controllers/posts-controller");
const postValidator = require("../middlewares/post-middleware");
const error_checker = require("../middlewares/error-checking-validator");

post_router.post("/new", auth_validator, postValidator, error_checker, createPost);
post_router.get('/of/:blog_id', fetchBlogPosts);
post_router.get('/:post_id', getSpecificPost);
post_router.delete("/delete/:post_id", auth_validator, deletePost);
//Update
post_router.post("/update", (req, res) => {
    res.send("Update profile");
});


//Delete
module.exports = post_router ;