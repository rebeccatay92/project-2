const User = require('../models/User')
const request = require('request')
const bcrypt = require('bcrypt')


function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    password: req.body.user.password
  })
  newUser.save(function (err, createdUser) {
    if (err) {
      req.flash('Errors', err.message)
      return res.redirect('/users/new')
    }
    res.redirect('/users/profile')
  })
}

function show (req, res) {
  res.send('profile here')
}

module.exports = {
  login,
  register,
  show
}
