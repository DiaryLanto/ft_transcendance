// app.js
const express = require('express');
const app = express();
const port = 8080;
const { sequelize, User } = require("./models");
const user_router = require('./routes/user-routes');
const blog_router = require('./routes/blog-routes');
const post_router = require('./routes/post-routes');
const comment_router = require('./routes/comment-routes');

app.use(express.json());

app.use('/users', user_router);
app.use('/blogs', blog_router);
app.use('/posts', post_router);
app.use('/comments', comment_router);


sequelize.authenticate().then(() => {
  console.log("Connection to database has been established.");
}).catch((error) => {
  console.log('Unable to connect to database: ',error);
});

// Define a route that sends "Hello, World!" as a response
app.get('/', (req, res) => {
  res.send('Bonjour tous le monde!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
