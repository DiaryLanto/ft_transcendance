const post_router = require('express').Router()
const auth_validator = require('../middlewares/auth-middleware-validation');
const {createPost, fetchBlogPosts} = require("../controllers/posts-controller");
const postValidator = require("../middlewares/post-middleware");
const error_checker = require("../middlewares/error-checking-validator");

post_router.post("/new", auth_validator, postValidator, error_checker, createPost);
post_router.get('/of/:blog_id', fetchBlogPosts);

post_router.get('/:id', (req, res) => {
    const id = req.params.id;
    //check id validity
    res.send(`GET posts with id ${id}`);
});

//Update
post_router.post("/update", (req, res) => {
    res.send("Update profile");
});


//Delete
post_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    //check id validity
    res.send(`Delete post with id ${id}`);
});
module.exports = post_router ;