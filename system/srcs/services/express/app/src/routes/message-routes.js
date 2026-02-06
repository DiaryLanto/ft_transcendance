const messageRouter = require('express').Router();
const {auth_validation} = require('../middlewares/auth-middleware-validation');
const {handleMessageFetch} = require('../controllers/messages-controller');
messageRouter.get('/:userId', auth_validation, handleMessageFetch);

module.exports = messageRouter;