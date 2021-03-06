var http = require('http')
var express = require('express')
var routes = require('./routes')
var path = require('path')
const mongoose = require('mongoose');
var cors = require('cors');

var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()
var indexRouter = require('./routes');
var registryRouter = require('./routes/registry');
var listPetsRouter = require('./routes/listPets');

require('dotenv').load();


// all environments
app.set('port', process.env.PORT || 3001)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(methodOverride())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

//We connect to the database
mongoose.Promise = require('bluebird');
mongoUrl = process.env['MONGODB_URL']
mongoose.connect(mongoUrl, { promiseLibrary: require('bluebird') })
  .then(() => console.log('Mongodb connection succesful'))
  .catch((err) => console.error(err));

app.use('/', indexRouter);
app.use('/api/registry', registryRouter);
app.use('/api/list', listPetsRouter);


// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app;
