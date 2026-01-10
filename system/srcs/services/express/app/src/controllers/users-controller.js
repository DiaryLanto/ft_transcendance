const user = require('../models/users');
const {signupUser, loginUser} = require('../services/user-services');

const signup = async (req, res) => {
    try
    {
        await signupUser(req.body);
        res.status(201).json({info: 'User signed up successfully'});
    }
    catch (error)
    {
        console.log(error);
        res.status(error.status).json({errors: error.message});
    }
}

const login = async (req, res) => {
    try {
        await loginUser(req.body);
        res.status(201).json({message: "Login successful"});
    } catch (error) {
        res.status(error.status).json({errors: error.message});
    }
}

module.exports = {
    signup,
    login
};