const {Post, Comment} = require ('../models');

const newPost = async (req) => {
    const user = req.user.sub;
    const postContent = req.body.content;
    const postId = req.body.post;

    const post = Post.findByPk(postId, {
        attributes: ["id"]
    });
    console.log (post);
    if (!post)
    {
        const error = new Error ("Post not found");
        error.status = 404;
        throw error;
    }
    await Comment.create({
        content: postContent,
        PostId: postId
    });
}

const getPostComments = async (req) => {
    const comments = await Comment.findAll({
        where: {
            PostId : req.params.post_id
        }
    })

    return (comments);
}

module.exports = {
    newPost,
    getPostComments
};