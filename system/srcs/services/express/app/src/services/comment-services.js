const {Blog, Post, Comment} = require ('../models');
const AppError = require("../errors/appError");

const newPost = async (req) => {
    const user = req.user.sub;
    const postContent = req.body.content;
    const postId = req.body.post;

    const post = Post.findByPk(postId, {
        attributes: ["id"]
    });
    console.log (post);
    if (!post)
        throw (new AppError(404, "Post not found"));
    await Comment.create({
        content: postContent,
        PostId: postId,
        UserId: user
    });
}

const getPostComments = async (req) => {
    const comments = await Comment.findAll({
        where: {
            PostId : req.params.post_id
        },
        attributes: ["id", "content" ,"createdAt", "UserId", "PostId"]
    })
    return (comments);
}

const verifyCommentOwnership = async (commentId, userId) =>
{
    const comment = await Comment.findByPk(commentId);
    if (!comment)
        throw (new AppError(404, "Comment not found"));
    if (comment.UserId !== userId)
        throw (new AppError(403, "Forbidden"));
    return (comment);
}

const saveCommentUpdate = async (commentId, userId, content) => {
    const comment = await verifyCommentOwnership(commentId, userId);
    comment.content = content;
    await comment.save();
}

const deleteCommentFromDB = async (commentId, userId) => {
    const comment = await verifyCommentOwnership(commentId, userId);
    comment.destroy();
}

const getCommentByUser = async (userId) => {
    const comments = await Comment.findAll({
        where: {
            UserId: userId
        },
        attributes: {
            exclude: ["publication_date", "UserId"]
        }
    });
    return comments;
}

const approveComment = async (userId, commentId) => {
    const comment = Comment.findByPk(commentId, {
        include: {
            model: Post,
            include: {
                model: Blog,
                attributes: ["UserId"]
            }
        }
    });

    if (!comment)
        throw (new AppError(404, "Comment not found"));
    if (userId !== comment.Post.Blog.UserId)
        throw (new AppError(403, "Forbidden"));
    comment.approved = true;
    await comment.save();
}

module.exports = {
    newPost,
    getPostComments,
    saveCommentUpdate,
    deleteCommentFromDB,
    getCommentByUser,
    approveComment
};