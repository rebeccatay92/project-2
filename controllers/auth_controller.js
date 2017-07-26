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

module.exports = {
  register
}
