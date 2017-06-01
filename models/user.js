'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

/* The user schema attributes/characteristics/fields */
let UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,

  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0}
  }]
});

/* Hash the password before we even save it to the database */
UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/* Compare password in the database and one typed be the user */
UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);
