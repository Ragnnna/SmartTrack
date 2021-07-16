const mongoose = require('mongoose')

const Room = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  doctorName: {
    type: String,
    require: true,
    unique: false
  }
})

module.exports = mongoose.model('Room', Room)