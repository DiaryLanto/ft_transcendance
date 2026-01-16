const {Post, Comment} = require ('../models');
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

const saveCommentUpdate = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment)
        throw (new AppError(404, "Comment not found"));
    comment.content = content;
}
module.exports = {
    newPost,
    getPostComments,
    saveCommentUpdate
};