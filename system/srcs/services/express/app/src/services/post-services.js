const {Post, Blog, User} = require("../models");
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

const postBelongsToUser = async (post_id, user_id) => {
    const post = await Post.findByPk(post_id, {
        include: {
            model: Blog,
            attributes: ["UserId"]
        }
    });
    if (!post)
        throw (new AppError (404, "Post not found"));
    if (post.Blog.UserId !== user_id)
        throw (new AppError (403, "Forbidden"));
    return (post);
}

const deletePostService = async (post_id, user_id) => {
    const post = await postBelongsToUser(post_id, user_id);
    await post.destroy();
}

const savePostUpdate = async ({title, content}, user_id, post_id) => {
    const post = await postBelongsToUser(post_id, user_id);
    post.title = title;
    post.content = content;
    await post.save();
    console.log("Save update");
}

const saveClapping = async (postId, UserId) => {
    const post = await Post.findByPk(postId);
    if (!post)
        throw (new AppError(404, "Post not found"));
    const clapped = await post.hasUser(UserId);
    if (!clapped)
    {
        await post.addUser(UserId);
        post.clap_count += 1;
        await post.save();
    }
}

module.exports = {
    newPost,
    getBlogPosts,
    getPost,
    deletePostService,
    savePostUpdate,
    saveClapping
};