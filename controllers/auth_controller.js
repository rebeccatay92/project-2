const User = require('../models/User')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    password: req.body.user.password
  })
  // create new user only if username is unique
  User.find({name: req.body.user.name}, function (err, docs) {
    if (docs.length) {
      req.flash('msg', 'This username is already taken. Please choose another')
      return res.redirect('/users/register')
    } else {
      newUser.save(function (err, createdUser) {
        if (err) {
          req.flash('msg', err.message)
          return res.redirect('/users/register')
        }
        res.redirect('/users/login')
      })
    }
  })
}

module.exports = {
  register
}
