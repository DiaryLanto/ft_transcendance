const newPost = require("../services/post-services")

const createPost = async (req, res) => {
    try {
        await newPost(req);
        res.status(200).json({message: "post created successfully"});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Error when creating post"});
    }
}

module.exports = createPost;