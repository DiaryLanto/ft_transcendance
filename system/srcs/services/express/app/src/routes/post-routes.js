const post_router = require('express').Router()

//Create

post_router.post("/new", (req, res) => {
    res.send("Create new post");
});


//Read
post_router.get('/', (req, res) => {
    const id = req.params.id;
    res.send(`GET all posts`);
});

post_router.get('/:id', (req, res) => {
    const id = req.params.id;
    //check id validity
    res.send(`GET posts with id ${id}`);
});

//Update
post_router.post("/update", (req, res) => {
    res.send("Update profile");
});


//Delete
post_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    //check id validity
    res.send(`Delete post with id ${id}`);
});
module.exports = post_router ;