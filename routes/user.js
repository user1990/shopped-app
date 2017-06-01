'use strict';

const router = require('express').Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  let user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      console.log(`${req.body.email} is already exist`);
      return res.redirect('/signup');
    }
    user.save(function(err, user) {
      if (err) { return next(err); }
      res.json('New User has been created');
    });

  });
});

module.exports = router;
