'use strict';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MongoStore = require('connect-mongo/es5')(session);
const passport = require('passport');

const User = require('./models/user');

// Initialize app
const app = express();

// Connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:test123@ds119210.mlab.com:19210/ecommerce', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('=========================');
    console.log('Connected to the database');
    console.log('=========================');
  }
});

// Middleware for HTTP request logs
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

// Listen to port
app.listen(4000, err => {
  if (err) { throw err; }
  console.log('==============================');
  console.log('Server is running on port 4000');
  console.log('==============================');
});
