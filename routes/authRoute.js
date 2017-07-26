const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')
const passport = require('../config/passport')

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  // Otherwise
  req.flash('errorMessage', 'Login to access!');
  return res.redirect('/users/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();
  // Otherwise
  req.flash('errorMessage', 'You are already logged in!');
  return res.redirect('/');
}


// path name
router.get('/login', unAuthenticatedUser, function (req, res) {
  res.render('auth/login')
})
router.post('/login', function(req, res) {
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/register'
  })(req,res) // close authenticate
}) //close post


router.get('/register', unAuthenticatedUser, function (req, res) {
  res.render('auth/new') // view name
})
router.post('/register', authController.register)

router.get('/profile', authenticatedUser, function (req, res) {
  res.render('auth/index', {
    user: user
  })
})

// passport.authenticate(<name of the strategy>, <post auth configuration, an obj>)

module.exports = router
