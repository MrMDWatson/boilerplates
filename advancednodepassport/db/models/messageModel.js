let mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  messageText: {
    type: String,
    required: true
  },
  created: {
    type: Date
  }
});

module.exports = mongoose.model('messages', messageSchema);