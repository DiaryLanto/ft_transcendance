const comment_router = require('express').Router();

// C
comment_router.post("/new", (req, res) => {
    res.send("Create new comment");
});
// R
comment_router.get("/", (req, res) => {
    res.send("GET all comments");
});
comment_router.get("/:id", (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`GET comment with id ${id}`);
});
// U
comment_router.post("/update", (req, res) => {
    res.send("Update comment");
});
// D
comment_router.delete("/delete/:id",  (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`DELETE comment with id ${id}`);
});

module.exports = comment_router;