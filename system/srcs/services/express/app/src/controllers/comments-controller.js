const {newPost, getPostComments, saveCommentUpdate, deleteCommentFromDB} = require('../services/comment-services');

const createPost = async (req, res, next) => {
    try {
        await newPost(req);
        res.status(200).json({message: "comment posted"});
    } catch (error) {
        next(error);
    }

}

const getCommentOfPost = async (req, res, next) => {
    try {
        const comments = await getPostComments(req);
        res.status(200).json({data: (comments.length === 0 ? "no comment" : comments)});
    } catch (error) {
        next(error);
    }
}

const handleCommentUpdate = async(req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.user.sub;
    const content = req.body.content;
    try {
        await saveCommentUpdate(commentId, userId, content);
        res.status(200).json({message : "Comment updated"});
    } catch (error) {
        next(error);
    }
}

const handleCommentDeletion = async (req, res, next) => {
    try {
        await deleteCommentFromDB(req.params.commentId, req.user.sub)
        res.status(200).json({message: "Comment deleted"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getCommentOfPost,
    handleCommentUpdate,
    handleCommentDeletion
};