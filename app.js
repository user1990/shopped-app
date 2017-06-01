const express = require('express');
const morgan = require('morgan');

// Initialize app
const app = express();

// Middleware for HTTP request logs
app.use(morgan('dev'));

// Home route
app.get('/', (req, res) => {
  res.json('Home Page');
});

// Listen to port
app.listen(3000, err => {
  if (err) { throw err; }
  console.log('==============================');
  console.log('Server is running on port 4000');
  console.log('==============================');
});
