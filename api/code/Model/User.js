const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    User,
    UserSchema
}