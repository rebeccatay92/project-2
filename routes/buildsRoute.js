const express = require('express')
const router = express.Router()

const buildsController = require('../controllers/builds_controller')

//show page with all heroes
router.get('/', function(req, res) {
  res.render('builds/index', {
    user: req.user
  })
})

//show page for creating new build
router.get('/new', function (req, res) {
  res.render('builds/new', {
    user: req.user
  })
})

//show all user builds
router.get('/manage', buildsController.show)

// show page to update a specific build
router.get('/update/:id', buildsController.showUpdate)

// show builds filtered by hero
router.get('/:hero', buildsController.showByHero)

//save the build created
router.post('/new', buildsController.create)

// redirect to update page specific to clicked build
router.post('/edit', function (req, res) {
  var buildId = req.body.build.id
  res.redirect(`/builds/update/${buildId}`)
})

// delete builds
router.post('/manage/:id', buildsController.destroy)

router.post('/update', buildsController.update)

module.exports = router
