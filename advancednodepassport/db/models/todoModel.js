let mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  
  user_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('todos', todoSchema);