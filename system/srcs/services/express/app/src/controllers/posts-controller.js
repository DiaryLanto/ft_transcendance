const { post } = require("../routes/post-routes");
const {newPost, getBlogPosts} = require("../services/post-services")

const createPost = async (req, res) => {
    try {
        await newPost(req);
        res.status(200).json({message: "post created successfully"});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Error when creating post"});
    }
}

const fetchBlogPosts = async (req, res, next) => {
    try {
        if (!req.params.blog_id)
            res.status(404).json({error: "forbidden"});
        const posts = await getBlogPosts(req);
        const status = posts.length === 0 ? 404 : 200;
        res.status(status).json({data: posts.length === 0 ? "no post" : posts});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "Error fetching blog"});
    }
}

module.exports = {
    createPost,
    fetchBlogPosts
};