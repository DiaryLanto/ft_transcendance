const user_router = require('express').Router()

//Create

user_router.post("/new", (req, res) => {
    const name = req.body.nom;
    res.send(`Create new user ${name}`);
});


//Read
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