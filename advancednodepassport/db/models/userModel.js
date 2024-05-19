let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: String,
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);