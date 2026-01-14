const {newPost, getPostComments} = require('../services/comment-services');

const createPost = async (req, res) => {
    try {
        await newPost(req);
        res.status(200).json({message: "comment posted"});
    } catch (error) {
        res.status(400).json({error: "Error while posting"});
    }

}

const getCommentOfPost = async (req, res) => {
    try {
        const comments = await getPostComments(req);
        res.status(200).json({data: (comments.length === 0 ? "no comment" : comments)});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "Error fetching"});
    }
}

module.exports = {
    createPost,
    getCommentOfPost
};