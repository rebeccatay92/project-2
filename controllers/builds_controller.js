const Build = require('../models/Build')
const request = require('request')


function showAll (req,res) {
  res.render('builds/index')
}

function show (req, res) {
  res.send('Indiv builds')
}

function build (req, res) {
  // res.send(req.body)
  res.render('builds/new')
}

function save (req, res) {
  res.send(req.body)
}

module.exports = {
  showAll,
  show,
  build,
  save
}
