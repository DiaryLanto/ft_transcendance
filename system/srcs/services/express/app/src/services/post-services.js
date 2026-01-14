const {Post, Blog} = require("../models");
const AppError = require('../errors/appError');

const newPost = async (req) => {
    const blog = await Blog.findByPk(req.body.blog);

    console.log(blog.id);
    
    if (!blog)
        throw (new AppError(404, "Blog not found"));
    if (req.user.sub != blog.UserId)
        throw (new AppError(403, "Forbidden"));
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
        attributes: ["id", "title", "createdAt", "BlogId"] // content
    });
    return (posts);
}

const getPost = async (postId) => {
    const post = await Post.findByPk(postId, {
        attributes: ["title", "content", "createdAt", "BlogId"]
    });
    return (post);
}

const deletePostService = async (post_id, user_id) => {
    const post = await Post.findByPk(post_id, {
        include: {
            model: Blog,
            attributes: ["UserId"]
        }
    });

    if (!post)
    {
        const error = new AppError (404, "Post not found");
        throw (error);
    }
    if (post.Blog.UserId !== user_id)
    {
        const error = new AppError (403, "Forbidden");
        throw (error);
    }
    await post.destroy();
}

module.exports = {
    newPost,
    getBlogPosts,
    getPost,
    deletePostService
};