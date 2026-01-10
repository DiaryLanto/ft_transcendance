const {User} = require("../models");
const bcrypt = require("bcrypt");
const {Op} = require('sequelize');

const signupUser = async ({login, email, passwd}) => {
    try
    {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {login: login},
                    {email: email}
                ]
            }
        });
        if (user)
        {
            const error = new Error("login or email already in use");
            error.status = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(passwd, 10);         
        await User.create({
        login: login,
        email: email,
        password: hashedPassword
        });
    }
    catch (error)
    {
        throw (error);
    }
}

const loginUser = async ({login, passwd}) => {
    
    const error = new Error('Bad credential');
    error.status = 401;

    const client = await User.findOne({
        where : {login: login}
    });
    if (client)
    {
        
        console.log('User logged in');
    }
    else
        throw error;
}

module.exports = { 
    signupUser,
    loginUser
};