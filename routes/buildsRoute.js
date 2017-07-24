const express = require('express')
const router = express.Router()

const buildsController = require('../controllers/builds_controller')


router.get('/', buildsController.showAll) //show all builds
router.get('/manage', buildsController.show) //show user's builds

router.get('/new', function (req, res) {
  res.render('builds/new')
}) //show page for creating build
router.post('/new', buildsController.create) //save the build created


module.exports = router
