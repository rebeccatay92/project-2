const Build = require('../models/Build')
const User = require('../models/User')
const request = require('request')

function showByHero (req, res) {
  Build
  .find({heroSuffix: req.params.hero})
  .populate('creator')
  .exec(function (err, foundHero) {
    res.send(foundHero)
  })
  // res.send({
  //   search: req.params.hero
  // })
}

function show (req, res) {
  // res.send('testing show')
  User
  .findOne({_id: req.user.id})
  .populate('builds')
  .exec(function (err, foundUser) {
    if (err) throw (err)
    // res.send(foundUser)
    res.render('builds/manage', {
      user: req.user,
      builds: foundUser.builds
    }) //close render
  }) //close .exec
} //close fn show

function create (req, res) {
  var build = req.body.build
  var newBuild = new Build({
    hero: build.hero,
    title: build.title,
    starting: build.starting,
    core: build.core,
    late: build.late
  })
  newBuild.heroSuffix = build.hero.toLowerCase().replace(/ /g, '_')
  newBuild.creator = req.user.id // assigning current user id into creator
  newBuild.save(function (err, createdBuild) {
    if (err) throw (err)
    User.findOne({_id: req.user._id}, function (err, foundUser) {
      if(err) throw err
      foundUser.builds.push(createdBuild.id)
      foundUser.save(function (err, savedUser) {
        if (err) throw (err)
        res.redirect('/builds/manage')
      })
        //close res.send
    }) // close user.find
  }) // close newBuild.save
} // close fn create

function destroy (req, res) {
  User.findOne({_id: req.user.id}, function(err, foundUser) {
    // var index = foundUser.builds.indexOf(req.params.id)
    // foundUser.builds.splice(index,1)
    res.send(foundUser.builds)
  })
  // Build.remove({_id: req.params.id})
  // res.send(req.params.id)
}

module.exports = {
  showByHero,
  show,
  create,
  destroy
}
