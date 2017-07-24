const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildSchema = new Schema({
  hero: String,
  name: {
    type: String,
    required: [true, 'Please enter a title for your build'],
    minlength: [5, 'Build title needs to be at least 5 chars long']
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
