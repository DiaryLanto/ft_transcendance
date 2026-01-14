const {Blog} = require ("../models");
const AppError = require("../errors/appError");

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

module.exports = {
    newBlog,
    getAllBlogFromDB
};