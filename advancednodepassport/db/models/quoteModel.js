let mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  author: {
    type: String
  }
});

module.exports = mongoose.model('quotes', quoteSchema);