const comment_router = require('express').Router();
const auth_validation = require('../middlewares/auth-middleware-validation');
const {commentValidator, commentParamValidator, validateCommentUpdate} = require('../middlewares/comment-middleware');
const error_checker = require('../middlewares/error-checking-validator');
const {createPost, getCommentOfPost, handleCommentUpdate} = require('../controllers/comments-controller');

comment_router.post("/new", auth_validation, commentValidator, error_checker, createPost);
comment_router.get("/of/:post_id", commentParamValidator, error_checker, getCommentOfPost);
comment_router.post("/update/:commentId", auth_validation, validateCommentUpdate, error_checker, handleCommentUpdate);

comment_router.delete("/delete/:id",  (req, res) => {
    const id = req.params.id;
    //check id param
    res.send(`DELETE comment with id ${id}`);
});

module.exports = comment_router;