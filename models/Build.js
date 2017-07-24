const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildSchema = new Schema({
  hero: String,
  name: {
    type: String,
    required: [true, 'Please type your name'],
    minlength: [5, 'Username must be at least 5 chars']
  },
  starting: [{
    type: String
  }],
  core: [{
    type: String
  }],
  late: [{
    type: String
  }],
  others: [{
    type: String
  }]
})

const Build = mongoose.model('Build', buildSchema)

module.exports = Build
