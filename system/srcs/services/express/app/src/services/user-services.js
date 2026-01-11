const {User} = require("../models");
const bcrypt = require("bcrypt");
const {Op} = require('sequelize');
const {SignJWT} = require('jose');

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
    const  secret = new TextEncoder().encode("secret_test");
    const error = new Error('Bad credential');
    error.status = 401;

    const client = await User.findOne({
        where : {login: login}
    });
    if (!client)
        throw error;
    const matched = await bcrypt.compare(passwd, client.password);
    if (!matched)
        throw error;
    
    const token = await new SignJWT({ sub: client.id, login: client.login, email: client.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);

    return {
        client,
        token
    };
}

module.exports = { 
    signupUser,
    loginUser
};