const {body} = require('express-validator');
const {jwtVerify} = require('jose');

const auth_validation = async (req, res, next) => {
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
        next();
    } catch (error) {
        console.log(error); // Debbug
        res.status(401).json({message: "Unauthorised"});
    }
}

module.exports = auth_validation;