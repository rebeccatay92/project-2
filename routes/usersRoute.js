const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/login', usersController.login)
router.get('/new', usersController.register)

router.post('/new', usersController.create)

module.exports = router
