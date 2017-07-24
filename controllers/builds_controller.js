const Build = require('../models/Build')
const request = require('request')


function showAll (req,res) {
  res.render('builds/index')
}

function show (req, res) {
  res.send('Indiv builds')
}


function create (req, res) {
  res.send(req.body)
}

module.exports = {
  showAll,
  show,
  create
}
