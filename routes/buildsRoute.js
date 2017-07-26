const express = require('express')
const router = express.Router()

const buildsController = require('../controllers/builds_controller')

//show builds by hero
router.get('/', function(req, res) {
  res.render('builds/index', {
    user: req.user
  })
})

//show page for creating build
router.get('/new', function (req, res) {
  res.render('builds/new', {
    user: req.user
  })
})

//show user's builds
router.get('/manage', buildsController.show)

router.get('/update/:id', buildsController.update)

router.get('/:hero', buildsController.showByHero)

router.post('/new', buildsController.create) //save the build created

router.post('/edit', function (req, res) {
  var buildId = req.body.build.id
  res.redirect(`/builds/update/${buildId}`)
})


router.post('/manage/:id', buildsController.destroy)

module.exports = router
