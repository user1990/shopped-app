'use strict';
const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const passportConf = require('../config/passport');


router.get('/login', function(req, res) {
  if (req.user) { return res.redirect('/'); }
  res.render('accounts/login', { message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) { return next(err); }

    res.render('accounts/profile', { user: user });

  });
});

router.get('/signup', function(req, res, next) {
  // if (err) { return next(err); }
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', (req, res, next) => {
  let user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.profile.picture = user.gravatar();

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');
      return res.redirect('/signup');
    } else {
      user.save((err, user) => {
        if (err) { return next(err); }

        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/profile');

        });
      });
    }
  });
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/edit-profile', function(req, res, next) {
  res.render('accounts/edit-profile', { message: req.flash('success')});
});

router.post('/edit-profile', function(req, res, next) {
  User.findOne({ _id: req.user._id }, (err, user) => {

    if (err) { return next(err); }

    if (req.body.name) { user.profile.name = req.body.name; }
    if (req.body.address) { user.address = req.body.address; }

    user.save(function(err) {
      if (err) { return next(err); }
      req.flash('success', 'Successfully Edited your profile');
      return res.redirect('/edit-profile');
    });
  });
});

module.exports = router;
