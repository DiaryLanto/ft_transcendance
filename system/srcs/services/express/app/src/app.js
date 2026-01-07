// app.js
const express = require('express');
const app = express();
const port = 8080;
const { sequelize, User } = require("./models");

sequelize.authenticate().then(() => {
  console.log("Connection to database has been established.");
  // sequelize.sync().then(() => {
  //   console.log('Migrated successfully');
  // }).catch((error) => {
  //   console.log('Error during migration', error);
  // }
  // );
  User.create(
    {
      login: "fralaima",
      bio: "I am an electronic engineer",
      password: "azerty",
      email: "rakoto@gmail.com"
    }
  );
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
