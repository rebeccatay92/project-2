const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')
const passport = require('../config/passport')

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  // Otherwise
  req.flash('msg', 'Login to access!');
  return res.redirect('/users/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();
  // Otherwise
  req.flash('msg', 'You are already logged in!');
  return res.redirect('/');
}


// path name
router.get('/login', unAuthenticatedUser, function (req, res) {
  res.render('auth/login', {
    flash: req.flash('msg')
  })
})
router.post('/login', function(req, res) {
  passport.authenticate('local', {
    successRedirect: '/builds/manage',
    failureRedirect: '/users/register'
  })(req,res) // close authenticate
}) //close post


router.get('/register', unAuthenticatedUser, function (req, res) {
  res.render('auth/new') // view name
})
router.post('/register', authController.register)

// passport.authenticate(<name of the strategy>, <post auth configuration, an obj>)

module.exports = router
