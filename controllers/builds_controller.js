const Build = require('../models/Build')
const User = require('../models/User')
// const request = require('request')

function showByHero (req, res) {
  Build
  .find({heroSuffix: req.params.hero})
  .populate('creator')
  .exec(function (err, foundHero) {
    if (err) res.send(err)
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
    if (err) res.send(err)
    // res.send(foundUser)
    res.render('builds/manage', {
      user: req.user,
      builds: foundUser.builds
    }) // close render
  }) // close .exec
} // close fn show

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
    if (err) res.send(err)
    User.findOne({_id: req.user._id}, function (err, foundUser) {
      if (err) res.send(err)
      foundUser.builds.push(createdBuild.id)
      foundUser.save(function (err, savedUser) {
        if (err) res.send(err)
        res.redirect('/builds/manage')
      })
        // close res.send
    }) // close user.find
  }) // close newBuild.save
} // close fn create

function destroy (req, res) {
  User.findOne({_id: req.user.id}, function (err, foundUser) {
    if (err) return res.send(err)
    // var index = foundUser.builds.indexOf(req.params.id)
    foundUser.builds.remove(req.params.id)
    foundUser.save()
    // res.send(foundUser)
  })
  Build.remove({_id: req.params.id}, function (err, removedBuild) {
    res.send('success')
  })
}

function showUpdate (req, res) {
  var buildId = req.params.id
  Build.findOne({_id: buildId}, function (err, foundBuild) {
    if (err) return res.send(err)
    res.render('builds/update', {
      user: req.user,
      buildId: req.params.id,
      build: foundBuild // passing buildid into update page
    })
  })
}

function update (req, res) {
  var build = req.body.build
  qObj = {
    _id: build.id
  }
  updateObj = {
    title: build.title,
    starting: build.starting,
    core: build.core,
    late: build.late
  }
  Build.update(qObj, updateObj, function (err, updatedBuild) {
    if (err) return res.send(err)
    res.redirect('/builds/manage')
  })
}

module.exports = {
  showByHero,
  show,
  create,
  destroy,
  showUpdate,
  update
}
