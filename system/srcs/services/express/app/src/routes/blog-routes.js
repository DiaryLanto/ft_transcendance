const error_checker = require('../middlewares/error-checking-validator');
const blog_router = require('express').Router();
const blog_validator = require("../middlewares/blog-validator");
const auth_validation = require("../middlewares/auth-middleware-validation");
const {createBlog, getAllBlog} = require("../controllers/blogs-controller");


blog_router.post("/new", auth_validation,blog_validator, error_checker, createBlog);
blog_router.get("/", auth_validation, getAllBlog);

blog_router.get("/:id", (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`GET blog with id ${id}`);
});
// U
blog_router.post("/update", (req, res) => {
    res.send("Update blog");
});
// D
blog_router.delete("/delete/:id",  (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`DELETE blog with id ${id}`);
});

module.exports = blog_router;