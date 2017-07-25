const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildSchema = new Schema({
  hero: {
    type: String,
    required: [true, 'You need to choose a hero']
  },
  heroSuffix: String,
  title: {
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
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Build = mongoose.model('Build', buildSchema)

module.exports = Build
