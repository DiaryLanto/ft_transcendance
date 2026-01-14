const {newPost, getPostComments} = require('../services/comment-services');

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

module.exports = {
    createPost,
    getCommentOfPost
};