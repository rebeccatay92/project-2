const User = require('../models/User')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    password: req.body.user.password
  })
  // create new user if username is unique
  User.find({name: req.body.user.name}, function (err, docs) {
    if (docs.length) {
      return res.redirect('/users/register')
    } else {
      newUser.save(function (err, createdUser) {
        if (err) {
          req.flash('msg', err.message)
          return res.redirect('/users/register')
        }
        res.redirect('/users/login') // ~~ client req GET /profile
      })
    }
  })
}

module.exports = {
  register
}
