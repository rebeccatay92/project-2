const Build = require('../models/Build')
const User = require('../models/User')
const request = require('request')

function showByHero (req, res) {
  Build
  .find({heroSuffix: req.params.hero})
  .populate('creator')
  .exec(function (err, foundHero) {
    if (err) res.send(err)
    res.send(foundHero)
  })
}

function show (req, res) {
  User
  .findOne({_id: user.id})
  .populate('builds')
  .exec(function (err, foundUser) {
    if (err) res.send(err)
    res.render('builds/manage', {
      user: user,
      builds: foundUser.builds
    })
  })
}

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
  newBuild.creator = user.id

  newBuild.save(function (err, createdBuild) {
    if (err) return res.send(err)
    User.findOne({_id: user.id}, function (err, foundUser) {
      if (err) return res.send(err)
      foundUser.builds.push(createdBuild.id)
      console.log('createdBuild', createdBuild)

      foundUser.save(function (err, savedUser) {
        if (err) console.log(err)
        res.redirect('/builds/manage')
      })

    })
  })

}

function destroy (req, res) {
  User.findOne({_id: user.id}, function (err, foundUser) {
    if (err) return res.send(err)
    foundUser.builds.remove(req.params.id)
    foundUser.save()
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
      user: user,
      buildId: req.params.id,
      build: foundBuild
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
