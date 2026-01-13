const {Blog} = require ("../models");

const newBlog = async ({name}, {sub}) => {
    const blogError = new Error ("Invalid blog name");
    blogError.status = 401;
    const blog = await Blog.findOne({
        where: {name: name}
    })
    if (blog)
        throw blogError;
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