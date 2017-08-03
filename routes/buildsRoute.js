const express = require('express')
const router = express.Router()

const buildsController = require('../controllers/builds_controller')

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  // Otherwise
  req.flash('plslogin', 'Login to access!');
  return res.redirect('/users/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();
  // Otherwise
  req.flash('alrdyloggedin', 'You are already logged in!')
  return res.redirect('/');
}

//show page with all heroes
router.get('/', function(req, res) {
  res.render('builds/index', {
    user: user
  })
})

//show page for creating new build
router.get('/new', authenticatedUser, function (req, res) {
  res.render('builds/new', {
    user: user
  })
})

//show all user builds
router.get('/manage', authenticatedUser, buildsController.show)

// show page to update a specific build
router.get('/update/:id', authenticatedUser, buildsController.showUpdate)

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
