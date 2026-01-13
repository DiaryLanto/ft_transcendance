const newPost = require('../services/comment-services');

const createPost = async (req, res) => {
    try {
        await newPost(req);
        res.status(200).json({message: "comment posted"});
    } catch (error) {
        res.status(400).json({error: "Error while posting"});
    }

}

module.exports = createPost;