const user = require('../models/users');
const {signupUser, loginUser, fetchUserFromDB, updateProfile, deleteUserFromDB, savePost} = require('../services/user-services');
const AppError = require("../errors/appError");
const { User } = require('../models');

const signup = async (req, res, next) => {
    try{
        await signupUser(req.body);
        res.status(200).json({message: 'User signed up successfully'});
    }
    catch (error){
        next(error);
    }
}

const login = async (req, res, next) => {
    if (!req.body.login || !req.body.passwd)
    {
        const error = new AppError(400, "Bad request");
        next (error);
    }
    try {
        const {user, token} = await loginUser(req.body);
        res.status(201).json({
            message: "Login successful",
            access_token: token 
        });
    } catch (error) {
        next(error);
    }
}

const handleGetUser = async (req, res, next) => {
    try {
        const user = await fetchUserFromDB(req.params.userId);
        res.status(200).json({data : user});
    } catch (error) {
        next(error);
    }
}

const handleProfilUpdate = async (req, res, next) => {
    try {
        await updateProfile(req.user.sub, req.body);
        res.status(200).json({message: "Profile update successful"});
    } catch (error) {
        next(error);
    }
}

const handleSelfDelete = async (req, res, next) => {
    if (!req.body.password)
        return next(new AppError(400, "Bad request"));
    try {
        await deleteUserFromDB(req.user.sub, req.body.password);
        res.status(200).json({message : "User deleted"});
    } catch (error) {
        next (error);
    }
}

const handleSaveToLibrary = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.sub;
        await savePost(postId, userId);
        res.status(200).json({message: "post saved"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    login,
    handleGetUser,
    handleProfilUpdate,
    handleSelfDelete,
    handleSaveToLibrary
};
