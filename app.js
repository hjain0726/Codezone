var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const request=require('request');
var expressHbs=require('express-handlebars');
var passport=require('passport');
var flash=require('connect-flash');
var validator=require('express-validator');
var Recaptcha = require('express-recaptcha');
var routes=require('./routes/route');

var mongoose=require('mongoose');
var session=require('express-session');
mongoose.connect('mongodb://test:test@ds213239.mlab.com:13239/codezone');
require('./config/passport');


var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/Images'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret:'mysupersecret',resave:false,saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  next();
});
app.use('/',routes);


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
