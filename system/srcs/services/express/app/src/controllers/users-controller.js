const user = require('../models/users');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty())
    {
        //check login duplicate
        //password should be hashed
        if (req.body.passwd == req.body.confirm)
        {
            bcrypt.hash(req.body.passwd, 10)
                .then((hash) =>{
                    console.log(`hash : ${hash}`);
                    User.create({
                    login: req.body.login,
                    email: req.body.email,
                    password: hash
                    }) 
                        .then(() => {
                            res.send("User created successfully");
                        })
                        .catch((error) => {
                            res.status(500).json({ error: 'Signup failed!'});
                        });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({ error: 'Signup failed!'});
                });
        }
    }
    else
        res.send(error);
}

module.exports = signup;