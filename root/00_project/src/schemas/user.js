const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  author: ObjectId,
  name: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  salt: {
    required: true,
    type: String,
  },
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('User', User);
