const user_router = require('express').Router()
const {validateNewUser, avatarMiddleware} = require('../middlewares/users-middleware');
const {auth_validation} = require('../middlewares/auth-middleware-validation');
const {
    signup,
    login,
    handleGetUser,
    handleProfilUpdate,
    handleSelfDelete,
    handleSaveToLibrary,
    handleDeleteSavedPost,
    handleAvatarUpdate,
    handleFollow,
    handleUnfollow
} = require('../controllers/users-controller');
const error_checker = require('../middlewares/error-checking-validator');

user_router.post("/signup", validateNewUser, error_checker, signup);
user_router.post("/login", login);
user_router.post("/:userId/follow", auth_validation, handleFollow);
user_router.delete("/:userId/follow", auth_validation, handleUnfollow);
user_router.post("/:postId/library", auth_validation, handleSaveToLibrary);
user_router.delete("/:postId/library", auth_validation, handleDeleteSavedPost);
user_router.get('/:userId', handleGetUser);
user_router.patch("/", auth_validation , handleProfilUpdate);
user_router.patch("/me/avatar", auth_validation, avatarMiddleware, handleAvatarUpdate);
user_router.delete("/", auth_validation, handleSelfDelete);
module.exports = user_router ;