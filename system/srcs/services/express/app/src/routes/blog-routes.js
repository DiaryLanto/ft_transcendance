const error_checker = require('../middlewares/error-checking-validator');
const blog_router = require('express').Router();
const {blogValidator, validateBlogUpdate} = require("../middlewares/blog-validator");
const auth_validation = require("../middlewares/auth-middleware-validation");
const {createBlog, getAllBlog, handleGetOneBlog, handleBlogUpate, handleBlogDelete} = require("../controllers/blogs-controller");


blog_router.post("/new", auth_validation, validateBlogUpdate, error_checker, createBlog);
blog_router.get("/", auth_validation, getAllBlog);
blog_router.get("/:blogId", handleGetOneBlog);
blog_router.post("/update/:blogId", auth_validation, validateBlogUpdate, error_checker, handleBlogUpate);
blog_router.delete("/delete/:blogId", auth_validation, handleBlogDelete);

module.exports = blog_router;