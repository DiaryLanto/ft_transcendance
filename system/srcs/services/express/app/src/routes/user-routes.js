const user_router = require('express').Router()
const {validateNewUser} = require('../middlewares/users-validator');
const auth_validator = require('../middlewares/auth-middleware-validation');
const {signup, login, handleGetUser, handleProfilUpdate} = require('../controllers/users-controller');
const error_checker = require('../middlewares/error-checking-validator');

user_router.post("/signup", validateNewUser, error_checker, signup);
user_router.post("/login", login);
user_router.get('/:userId', handleGetUser);
user_router.post("/update", auth_validator , handleProfilUpdate);


//Delete
user_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    //check id validity
    res.send(`Delete user with id ${id}`);
});
module.exports = user_router ;