const blog_router = require('express').Router();

// C
blog_router.post("/new", (req, res) => {
    res.send("Create new blog");
});
// R
blog_router.get("/", (req, res) => {
    res.send("GET all blogs");
});
blog_router.get("/:id", (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`GET blog with id ${id}`);
});
// U
blog_router.post("/update", (req, res) => {
    res.send("Update blog");
});
// D
blog_router.delete("/delete/:id",  (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`DELETE blog with id ${id}`);
});

module.exports = blog_router;