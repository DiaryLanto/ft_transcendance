const auth_router = require('express').Router()
const {
    auth_validation,
    auth_2fa_validation
} = require('../middlewares/auth-middleware-validation');
const {
    handle2FAEnable,
    handle2FAVerify,
    handle2FAChallenge
} = require('../controllers/auth-conroller');

auth_router.post("/2FA/enable", auth_validation, handle2FAEnable);
auth_router.post("/2FA/verify", auth_validation, handle2FAVerify);
auth_router.post("/2FA/challenge", auth_2fa_validation, handle2FAChallenge);

module.exports = auth_router;