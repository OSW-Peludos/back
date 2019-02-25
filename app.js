const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const helmet = require('helmet')

const app = express();
const indexRouter = require('./routes');
const MainRoutes = require('./router');
require('dotenv').load();


// all environments
app.set('port', process.env.PORT || 3001);

app.use(helmet())

app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//We connect to the database
// mongoose.Promise = require('bluebird');
mongoUrl = process.env['MONGODB_URL']
mongoose.connect(mongoUrl, { promiseLibrary: require('bluebird') })
  .then(() => console.log('Mongodb connection succesful'))
  .catch((err) => console.error(err));

app.use('/', indexRouter);
// app.use('/api/registry', registryRouter);
// app.use('/api/list', listPetsRouter);
// app.use('/api/animal', findRecordRouter);

app.use('/api/v1', MainRoutes)


// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app;
