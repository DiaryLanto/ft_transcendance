const user_router = require('express').Router()
const {validateNewUser} = require('../middlewares/users-validator');
const auth_validator = require('../middlewares/auth-middleware-validation');
const {signup, login, handleGetUser, handleProfilUpdate, handleSelfDelete} = require('../controllers/users-controller');
const error_checker = require('../middlewares/error-checking-validator');

user_router.post("/signup", validateNewUser, error_checker, signup);
user_router.post("/login", login);
user_router.get('/:userId', handleGetUser);
user_router.patch("/", auth_validator , handleProfilUpdate);
user_router.delete("/", auth_validator, handleSelfDelete);
module.exports = user_router ;