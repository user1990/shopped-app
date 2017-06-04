'use strict';

const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: String,
  price: Number,
  image: String
});

// Run Elasticsearch
ProductSchema.plugin(mongoosastic, {
  hosts: [
    'localhost: 9200'
  ]
});

module.exports = mongoose.model('Product', ProductSchema);
