'use strict';

const router = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');

// Create map between product and DB within Elasticsearch
Product.createMapping((err, mapping) => {
  if (err) {
    console.log('======================');
    console.log('Error creating mapping');
    console.log(err);
    console.log('======================');
  } else {
    console.log('===============');
    console.log('Mapping created');
    console.log(mapping);
    console.log('===============');
  }
});

let stream = Product.synchronize();
let count = 0;

stream.on('data', () => {
  count++;
});

stream.on('close', () => {
  console.log(`Indexed ${count} documents`);
});

stream.on('error', (err) => {
  console.log(err);
});

// Routes
router.post('/search', (req, res, err, next) => {
  if (err) { return next(err); }
  res.redirect('/search?q=' + req.body.q);
});

router.get('/search', (req, res, next) => {
  if (req.query.q) {
    Product.search({
      query_string: { query: req.query.q }
    }, (err, results) => {
      if (err) { return next(err); }
      let data = results.hits.hits.map(hit => {
        return hit;
      });
      res.render('main/search-result', {
        query: req.query.q,
        data: data
      });
    });
  }
});

router.get('/', (req, res) => {
  res.render('main/home');
});

router.get('/about', (req, res) => {
  res.render('main/about');
});

router.get('/products/:id', (req, res, next) => {
  Product
    .find({ category: req.params.id })
    .populate('category')
    .exec((err, products) => {
      if (err) { return next(err); }
      res.render('main/category', {
        products: products
      });
    });
});

router.get('/product:id', (req, res, next) => {
  Product.findById({ _id: req.params.id }, (err, product) => {
    if (err) { return next(err); }
    res.render('main/product', {
      product: product
    });
  });
});

module.exports = router;
