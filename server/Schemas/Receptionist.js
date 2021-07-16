const mongoose = require('mongoose')

const Receptionist = new mongoose.Schema({
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
})

module.exports = mongoose.model('Receptionist', Receptionist)