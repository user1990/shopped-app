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
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const secret = require('./config/secret');
const User = require('./models/user');

// Initialize app
const app = express();

// Connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(secret.database, err => {
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
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

// Listen to port
app.listen(secret.port, err => {
  if (err) { throw err; }
  console.log('=======================================');
  console.log('Server is running on port' + secret.port);
  console.log('=======================================');
});
