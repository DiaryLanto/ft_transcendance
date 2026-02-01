const {
    generateOTPSecret,
    verifyDigits
} = require('../services/auth-services');

const handle2FAEnable = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const {otp_url, challengeId} = await generateOTPSecret(userId);
        res.status(200).json({
            otp_url: otp_url,
            challengeId: challengeId
        });
    } catch (error) {
        next(error);
    }
}

const handle2FAVerify = async (req, res, next) => {
    try {
        await verifyDigits(req.body.digits, req.body.challengeId, req.user.sub);
        res.status(200).json({message: "2FA enabled"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handle2FAEnable,
    handle2FAVerify
};