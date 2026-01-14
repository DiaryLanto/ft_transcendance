const user_router = require('express').Router()
const user_validator = require('../middlewares/users-validator');
const {signup, login} = require('../controllers/users-controller');
const error_checker = require('../middlewares/error-checking-validator');
//Create
user_router.post("/signup", user_validator, error_checker, signup);
//Read
user_router.post("/login", login);

user_router.get('/', (req, res) => {
    const id = req.params.id;
    res.send(`GET all Users`);
});

user_router.get('/:id', (req, res) => {
    const id = req.params.id;
    //check id validity
    res.send(`GET Users with id ${id}`);
});

//Update
user_router.post("/update", (req, res) => {
    res.send("Update profile");
});


//Delete
user_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    //check id validity
    res.send(`Delete user with id ${id}`);
});
module.exports = user_router ;