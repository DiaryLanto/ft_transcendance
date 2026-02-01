const auth_router = require('express').Router()
const auth_validator = require('../middlewares/auth-middleware-validation');
const {
    handle2FAEnable,
    handle2FAVerify
} = require('../controllers/auth-conroller');

auth_router.post("/2FA/enable", auth_validator, handle2FAEnable);
auth_router.post("/2FA/verify", auth_validator, handle2FAVerify);

module.exports = auth_router;