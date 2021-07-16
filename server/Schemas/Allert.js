const mongoose = require('mongoose')

const Allert = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  color: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true
  },
})

module.exports = mongoose.model('Allert', Allert)