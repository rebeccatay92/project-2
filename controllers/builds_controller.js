const Build = require('../models/Build')
const request = require('request')


function showAll (req,res) {
  res.render('builds/index', {
    user: req.user
  })
}

function show (req, res) {
  res.render('builds/manage', {
    user: req.user
  })
}


function create (req, res) {
  res.send(req.body)
}

module.exports = {
  showAll,
  show,
  create
}
