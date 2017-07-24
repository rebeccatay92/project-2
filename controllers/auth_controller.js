const User = require('../models/User')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    password: req.body.user.password
  })
  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/users/login') // ~~ client req GET /profile
  })
}

// function login (req, res) {
//   // find the user by username
//   User
//   .findOne({
//     name: req.body.user.name
//   })
//   .exec(function (err, foundUser) {
//     if (err) return res.send(err)
//     const formPassword = req.body.user.password
//
//     if (foundUser.validPassword(formPassword)) {
//       res.send('valid, redirect to profile')
//     } else {
//       res.send('invalid, show flash message')
//     }
//   }) //close exec
// } //close fn login

module.exports = {
  register,
  // login
}
