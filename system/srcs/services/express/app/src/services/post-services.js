const {Post, Blog} = require("../models");

const newPost = async (req) => {
    const blog = await Blog.findByPk(req.body.blog);

    console.log(blog.id);
    
    if (!blog)
    {
        const error = new Error ("Blog not found");
        error.status = 404;
        throw error;
    }
    if (req.user.sub != blog.UserId)
    {
        const error = new Error ("Forbidden");
        error.status = 403;
        throw error;
    }

    await Post.create( {
        title: req.body.title,
        content: req.body.content,
        BlogId: blog.id 
    }
    );
}

const getBlogPosts = async (req) => {
    const posts = await Post.findAll({
        where: {
            BlogId : req.params.blog_id
        },
        attributes: ["id", "title", "content", "createdAt", "BlogId"]
    });
    return (posts);
}

module.exports = {
    newPost,
    getBlogPosts
};