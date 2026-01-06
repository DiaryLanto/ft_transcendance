// app.js
const express = require('express');
const app = express();
const port = 8080;
const Sequelize = require("sequelize");

const db_name = process.env.MARIADB_DATABASE;
const db_user = process.env.MARIADB_USER
const db_pwd = process.env.MARIADB_PASSWORD
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(
  db_name,
  db_user,
  db_pwd,
  {
    host: db_host,
    dialect: 'mariadb'
  }
)

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
