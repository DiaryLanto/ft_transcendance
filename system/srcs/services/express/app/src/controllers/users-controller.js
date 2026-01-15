const user = require('../models/users');
const {signupUser, loginUser, fetchUserFromDB} = require('../services/user-services');
const AppError = require("../errors/appError");

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

module.exports = {
    signup,
    login,
    handleGetUser
};
