const AppError = require("../errors/appError");
const {User} =require ("../models");
const {newBlog, getAllBlogFromDB, fetchBlogFromDB, saveBlogUpdate, deleteBlog} = require("../services/blog-services");

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
        const blogs = await getAllBlogFromDB(req.params.blogId);
        res.status(200).json({data: blogs});
    } catch (error) {
        next(error);
    }
}

const handleGetOneBlog = async (req, res, next) => {
    if (!req.params.blogId)
        return next(new AppError(403, "Bad request"));
    try {
        const blog = await fetchBlogFromDB(req.params.blogId);
        res.status(200).json({data : blog});
    } catch (error) {
        next(error);
    }
}

const handleBlogUpate = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.user.sub;
        await saveBlogUpdate(blogId, userId, req.body);
        res.status(200).json({message: "Blog updated"});
    } catch (error) {
        next(error);
    }
}

const handleBlogDelete = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.user.sub;
        await deleteBlog(blogId, userId);
        res.status(200).json({message: "Blog deleted"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBlog,
    getAllBlog,
    handleGetOneBlog,
    handleBlogUpate,
    handleBlogDelete
};