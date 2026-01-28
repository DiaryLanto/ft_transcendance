const { post } = require("../routes/post-routes");
const {newPost, getBlogPosts, getPost, deletePostService, savePostUpdate, saveClapping} = require("../services/post-services")
const AppError = require('../errors/appError');

const createPost = async (req, res, next) => {
    try {
        await newPost(req);
        res.status(200).json({message: "post created successfully"});
    } catch (error) {
        next(error);
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
        next(error);
    }
}

const getSpecificPost = async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        if (!postId)
            return res.status(404).json({error: "forbidden"});
        const post = await getPost(postId);
        if (!post)
            res.status(404).json({error: "post no found"});
        else
            res.status(200).json({error: post});
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) =>{
    if (!req.params.post_id)
        return res.status(404).json({error: "forbidden"});
    try {
        await deletePostService(req.params.post_id, req.user.sub);
        res.status(200).json({message: "deleted"});
    } catch (error) {
        next(error);
    }
}

const handlePostUpdate = async(req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const updatedData = req.body;
        if (!post_id)
            throw (new AppError(401, "Bad request"));
        await savePostUpdate(updatedData, req.user.sub ,post_id);
        res.status(200).json({message: "Update saved"});
    } catch (error) {
        next(error);
    }
}

const handleClapping = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.sub;
        await saveClapping(postId, userId);
        res.status(200).json({message: "clapp saved"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    fetchBlogPosts,
    getSpecificPost,
    deletePost,
    handlePostUpdate,
    handleClapping
};