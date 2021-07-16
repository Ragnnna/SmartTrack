const mongoose = require('mongoose')

const Doctor = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phone: {
    type: String,
    require: false
  },
  password: {
    type: String,
    require: true
  },
  room: {
    type: String,
    require: false
  },
  allerts: {
    type: String,
    require: false
  },
  connected: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('Doctor', Doctor)