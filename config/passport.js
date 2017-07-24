const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

// it will store into the session, currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[name]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

// verify callback for local strategy
function localVerify (req, passportName, passportPassword, next) {
  // console.log('is localVerify running?')
  User
  .findOne({
    name: passportName
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // go to failureRedirect
    }
    if (!foundUser) {return next(err)} //if username dont exist failureRedirect
    if (foundUser.validPassword(passportPassword)) {
      console.log('success, redirect to /profile')
      next(null, foundUser) // go to successRedirect
    } else return next(err) //if username exist but password is wrong failureRedirect
  })
}

module.exports = passport
