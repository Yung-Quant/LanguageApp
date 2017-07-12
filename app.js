var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');
var index = require('./routes/index');
var conversation = require('./routes/conversation');
var profile = require('./routes/profile');
var addInfo = require('./routes/addInfo');
var findNew = require('./routes/findNew');

var app = express();
/*
var tunnel = require('./code/tunnel.js');
tunnel.start();
*/
global.db = mongoose.connect(config.mongoose.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('express-ejs-extend'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'agreatbigsecret'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', index);
app.use('/conversation', conversation);
app.use('/profile', profile);
app.use('/addInfo', addInfo);
app.use('/findNew', findNew);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
