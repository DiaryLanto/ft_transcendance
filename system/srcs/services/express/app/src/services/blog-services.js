const {Blog} = require ("../models");
const AppError = require("../errors/appError");
const blog = require("../models/blog");

const newBlog = async ({name}, {sub}) => {
    const blog = await Blog.findOne({
        where: {name: name}
    })
    if (blog)
        throw (new AppError(401, "Invalid blog name"));
    await Blog.create({
        name: name,
        UserId: sub
    })
    console.log("Creating new blog");
}

const getAllBlogFromDB = async(req) => {
    const user = req.user.sub;

    const blogs = await Blog.findAll({
        where: {
            UserId: user 
        },
        attributes: ["id", "name", "description", "createdAt"]
    })
    return blogs;
}

const fetchBlogFromDB = async (blogId) => {
    const blog = await Blog.findByPk(blogId, {
        attributes: {
            exclude : ["createdAt", "updatedAt"]
        }
    });
    if (!blog)
        throw (new AppError(404, "Blog not found"));
    return (blog);
}

const checkBlogOwnerShip = async (blogId, userId) => {
    const blog = await Blog.findByPk(blogId);
    if (!blog)
        throw (new AppError(404, "Comment not found"));
    if (blog.UserId !== userId)
        throw (new AppError(403, "Forbidden"));
    return (blog);
}

const saveBlogUpdate = async (blogId, userId, data) => {
    const blog = await checkBlogOwnerShip(blogId, userId);
    if (data.name !== undefined)
        blog.name = data.name;
    if (data.description !== undefined)
        blog.description = data.description;
    await blog.save();
}

module.exports = {
    newBlog,
    getAllBlogFromDB,
    fetchBlogFromDB,
    saveBlogUpdate
};