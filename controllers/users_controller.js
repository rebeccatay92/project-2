const User = require('../models/User')
const request = require('request')
const bcrypt = require('bcrypt')

function login (req, res) {
  res.render('users/login')
}

// function register (req, res) {
//   res.render('users/new', {
//     flash: req.flash('Errors')
//   })
// }

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
    res.redirect('/users/profile') // redirect to
    // res.send({
    //   status: 'ok',
    //   createdUser: createdUser
    // })
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
