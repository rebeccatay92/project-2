const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name'],
    minlength: [5, 'must have at least 5 chars']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [5, 'must have at least 5 chars']
  },
  builds: [{
    type: Schema.Types.ObjectId,
    ref: 'Build'
  }]
})

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
