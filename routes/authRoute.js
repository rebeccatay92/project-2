const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')

const passport =
require('../config/passport')

// path name
router.get('/login', function (req, res) {
  res.render('auth/login')
})
router.post('/login', function(req, res) {
  // res.send(req.body)
  //req.body is received correctly but passport.auth hanging

  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/register'
  })(req,res) // close authenticate
}) //close post


router.get('/register', function (req, res) {
  res.render('auth/new') // view name
})
router.post('/register', authController.register)

router.get('/profile', function (req, res) {
  res.render('auth/index', {
    user: req.user
  })
})

// passport.authenticate(<name of the strategy>, <post auth configuration, an obj>)

module.exports = router
