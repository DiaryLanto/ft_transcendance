const AppError = require('../errors/appError');
const {TotpEnrollement, User} = require("../models");
const {Op} = require('sequelize');
const {SignJWT} = require('jose');
const speakeasy = require('speakeasy');

const generateOTPSecret = async (userId) => {
    const secret = speakeasy.generateSecret({name:"ft_transcendance"});
    const expiryDate = new Date(Date.now() + 30 * 60 * 1000);
    const enrollement = await TotpEnrollement.create({
        temp_secret: secret.base32,
        expires_at: expiryDate,
        UserId: userId
    });
    return ({
        otp_url: secret.otpauth_url,
        challengeId: enrollement.id
    });
}

const verifyDigits = async (digits, challengeId, userId) => {
    const enrollment = await TotpEnrollement.findOne({
        where: {
            [Op.and]: [
                {id: challengeId},
                {UserId: userId}
            ]
        }
    })
    if (!enrollment)
        throw (new AppError(404, "challenge not found"));
    if (enrollment.expires_at < Date.now())
    {
        await enrollment.destroy();
        throw (new AppError(403, "token expired"))
    }
    const legal = await speakeasy.totp.verify({
        secret: enrollment.temp_secret,
        encoding: 'base32',
        token: digits,
        window: 1,
    });
    if (!legal)
    {
        enrollment.attempts += 1;
        if (enrollment.attempts > 3)
        {
            await enrollment.destroy();
            throw (new AppError(403, "bad digits, attempt number reached"));
        }
        else
        {
            await enrollment.save();
            throw (new AppError(403, "bad digits, try again"));
        }
    }
    const user = await User.findByPk(userId);
    if (!user)
        throw (new AppError(404, "user not found"));
    user.totp_secret = enrollment.temp_secret;
    user.two_fa_enabled = true;
    await user.save();
}

const loginWith2FA = async (userId, digits) => {
    const  secret = new TextEncoder().encode("secret_test");
    const user = await User.findByPk(userId);
    if (!user)
        throw (new AppError(404, "user not found"));
    console.log(user);
    const verified = await speakeasy.totp.verify({
        secret: user.totp_secret,
        encoding: 'base32',
        token: digits,
        window: 1,
    });
    if (!verified)
        throw (new AppError(403, "Forbidden, bad digits"));
    const claim = { sub: user.id, login: user.login, email: user.email };
    const token = await new SignJWT(claim)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
    return {token};
}

module.exports = {
    generateOTPSecret,
    verifyDigits,
    loginWith2FA
};