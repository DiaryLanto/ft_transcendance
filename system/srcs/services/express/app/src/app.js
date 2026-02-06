// app.js
const express = require('express');
const app = express();
const port = 8080;
const { sequelize, User } = require("./models");
const user_router = require('./routes/user-routes');
const blog_router = require('./routes/blog-routes');
const post_router = require('./routes/post-routes');
const comment_router = require('./routes/comment-routes');
const auth_router = require('./routes/auth-routes');
const messageRouter = require('./routes/message-routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/users', user_router);
app.use('/blogs', blog_router);
app.use('/posts', post_router);
app.use('/comments', comment_router);
app.use('/auth', auth_router);
app.use('/messages', messageRouter);
app.use(errorHandler);

sequelize.authenticate().then(() => {
  console.log("Connection to database has been established.");
  sequelize.sync().then(() => {
    console.log("Database synced");
  }).catch((error) => {
    console.log(error);
  });
}).catch((error) => {
  console.log('Unable to connect to database: ',error);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
