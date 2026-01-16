const {User} = require("../models");
const bcrypt = require("bcrypt");
const {Op} = require('sequelize');
const {SignJWT} = require('jose');
const AppError = require("../errors/appError");

const signupUser = async ({login, email, passwd}) => {
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
        const error = new AppError(401, "login or email already in use");
        throw error;
    }
    const hashedPassword = await bcrypt.hash(passwd, 10);         
    await User.create({
    login: login,
    email: email,
    password: hashedPassword
    });
}

const loginUser = async ({login, passwd}) => {
    const  secret = new TextEncoder().encode("secret_test");
    const error = new AppError(401, 'Bad credential');

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

const fetchUserFromDB = async (userId) => {
    const user = User.findByPk(userId, {
        attributes: {
            exclude : ["password"]
        }
    });
    if (!user)
        throw (new AppError(404, "User not found"));
    return user;
}

const updateProfile = async (userId, data) => {
    const user = await User.findByPk(userId);
    if (!user)
        throw (new AppError(404, "User not found"));
    if (data.date_of_birth !== undefined)
        user.date_of_birth = data.date_of_birth;
    if (data.bio !== undefined)
        user.bio = data.bio;
    if (data.phone !== undefined)
        user.phone = data.phone;
    if (data.address !== undefined)
        user.address = data.address;
    await user.save();
}

const deleteUserFromDB = async (userId, password) => {
    const user = await User.findByPk(userId);
    if (!user)
        throw (new AppError(404, "User not found"));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
        throw (new AppError(403, "Forbidden")); 
    await user.destroy();
}

module.exports = { 
    signupUser,
    loginUser,
    fetchUserFromDB,
    updateProfile,
    deleteUserFromDB
};