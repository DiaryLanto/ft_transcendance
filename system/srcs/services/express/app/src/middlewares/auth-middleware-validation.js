const {body} = require('express-validator');
const {jwtVerify} = require('jose');

const validate_user = async (req, res) => {
    const jwtSecret = new TextEncoder().encode("secret_test");
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({error: "No token found"});
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({error: "No token found"});
    try {
        const {payload} = await jwtVerify(token, jwtSecret);
        req.user = payload;
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorised, invalid token"});
    }
}

const auth_validation = async (req, res, next) => {
    await validate_user(req, res);
    if (req.user === undefined)
        return ;
    if (req.user.auth_level === "password")
        return res.status(401).json({message: "Unauthorised, temp token"});
    next();
}

const auth_2fa_validation = async (req, res, next) => {
    await validate_user(req, res);
    if (req.user === undefined)
        return ;
    next();
}

module.exports = {
    auth_validation,
    auth_2fa_validation
};