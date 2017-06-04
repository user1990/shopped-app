'use strict';
const router = require('express').Router();
const Category = require('../models/category');

router.get('/add-category', (req, res, err, next) => {
  if (err) { return next(err); }
  res.render('admin/add-category', { message: req.flash('success') });
});

router.post('/add-category', (req, res, next) => {
  let category = new Category();
  category.name = req.body.name;

  category.save(err => {
    if (err) { return next(err); }
    req.flash('success', 'Successfully added a category');
    return res.redirect('/add-category');
  });
});

module.exports = router;
