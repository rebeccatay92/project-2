const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/login', function(req, res) {
  res.render('users/login')
})

router.get('/profile', usersController.show)


router.get('/register', function (req,res) {
  res.render('users/new')
})

router.post('/register', usersController.register)

module.exports = router
