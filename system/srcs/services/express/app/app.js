// app.js
const express = require('express');
const app = express();
const port = 8080;

// Define a route that sends "Hello, World!" as a response
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
