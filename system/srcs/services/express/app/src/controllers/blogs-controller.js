const {User} =require ("../models");
const {newBlog, getAllBlogFromDB} = require("../services/blog-services");

const createBlog = async (req, res, next) => {
    try {
        await newBlog(req.body, req.user);
        res.status(200).json({message: "Blog created successfully"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await getAllBlogFromDB(req);
        res.status(200).json({data: blogs});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBlog,
    getAllBlog
};