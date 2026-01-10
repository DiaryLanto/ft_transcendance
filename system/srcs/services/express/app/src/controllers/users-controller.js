const user = require('../models/users');
const signup_user = require('../services/user-signup');

const signup = async (req, res) => {
        try
        {
            await signup_user(req.body);
            res.status(201).json({info: 'User signed up successfully'});
        }
        catch (error)
        {
            console.log(error);
            res.status(error.status).json({errors: error.message});
        }
    }

module.exports = signup;