const user = require('../models/users');
const {signupUser, loginUser} = require('../services/user-services');

const signup = async (req, res) => {
    try{
        await signupUser(req.body);
        res.status(200).json({info: 'User signed up successfully'});
    }
    catch (error){
        next(error);
    }
}

const login = async (req, res) => {
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

module.exports = {
    signup,
    login
};
