var express = require('express');
var server = require('./bin/www');
var mongoose = require('mongoose');
var config = require('./config.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var address = require('address');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var routes = require('./routes/index');
var users = require('./routes/users');
var cars = require('./routes/cars');
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevServer = require('webpack-dev-server'),
    webpackDevConfig = require('./webpack.config.js');
var compiler = webpack(webpackDevConfig);

var app = express();
var port = '8080';
// var io = require('socket.io')(server);

var ioserver = require('http').Server(app);
ioserver.listen(port);
var io = require('socket.io')(ioserver);
// attach to the compiler & the server
// app.use(webpackDevMiddleware(compiler, {
//     // public path should be the same with webpack config
//     publicPath: webpackDevConfig.output.publicPath,
//     noInfo: true,
//     stats: {
//       colors: true
//     }
// }));
// app.use(webpackHotMiddleware(compiler));

// console.log(app.get('env'));
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
var swig = require('swig');
swig.setDefaults({
    cache: false,
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));



app.use('/', routes);
app.use('/users', users);
app.use('/cars', cars);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('public/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('public/error', {
    message: err.message,
    error: {}
  });
});
app.locals.title = "ChatGroup";

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

connect()
  .on('error', function (err) {
    console.log('Mongoose connection error: ' + err); 
  })
  .on('disconnected', connect)
  .once('open', function () {
    console.log('Mongoose connecting'); 
  });


io.on('connection', function (socket) {
  socket.emit('user connected');
  socket.on('send message', function (data) {
     socket.broadcast.emit('new message' , data);
  });
});


module.exports = app;
