const express = require('express')
const router = express.Router()

const buildsController = require('../controllers/builds_controller')


router.get('/', buildsController.showAll) //show all builds
router.get('/new', buildsController.build) //show page for creating build
router.get('/:id', buildsController.show) //show user's builds

router.post('/new', buildsController.save) //save the build created
// router.post('/', usersController.create)

module.exports = router
