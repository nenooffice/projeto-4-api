const mongoose = require('mongoose');

module.exports = mongoose.model('Sorvete', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
}));