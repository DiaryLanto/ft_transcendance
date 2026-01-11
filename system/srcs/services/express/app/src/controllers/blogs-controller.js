const {User} =require ("../models");
const newBlog = require("../services/blog-services");

const createBlog = async (req, res, next) => {
    try {
        await newBlog(req.body, req.user);
        res.status(200).json({message: "Blog created successfully"});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Cannot create blog"});
    }
}

module.exports = createBlog;