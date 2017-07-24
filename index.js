// before everything else. load the .env file
require('dotenv').config()

// all the modules we install and we need to require
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')


const url = 'mongodb://localhost:27017/magicmango'
// const url = process.env.MLAB_URI

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)

// this is the express itself
const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/magicmango'
  })
}))

//setting up passport
const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// set middleware
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
// listen to ajax request - json post
app.use(bodyParser.json())

// listen to form data submission
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())

// setup all files that the proj needs to require
// const usersRoute = require('./routes/usersRoute')
const buildsRoute = require('./routes/buildsRoute')
const authRoute = require('./routes/authRoute')


app.locals = {
  STEAM_API_KEY: process.env.STEAM_API_KEY
}

// setup your project routes
// NO REQUIRING AFTER THIS LINE
// public paths
app.get('/', function (req, res) {
  res.render('index')
})

// non public paths
app.use('/users', authRoute)
app.use('/builds', buildsRoute)

// and this is opening the port
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
