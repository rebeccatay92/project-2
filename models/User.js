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
  User.find({name: this.name}, function (err, docs) {
    if (!docs.length) {
      next()
    } else {
      console.log('user exists: ', this.name);
      next(new Error("This username is already taken. Please choose another."))
    }
  })
})

// userSchema.pre('save', function (next) {
//   var user = this
//
//   //only hash the password if it has been modified or new
//   if(!user.isModified('password')) return next()
//
//   //hash password
//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if (err) return next(err)
//     user.password = hash
//     next()
//   })
// })
const User = mongoose.model('User', userSchema)

module.exports = User
