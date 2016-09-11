'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http2 = require('http');

var _http3 = _interopRequireDefault(_http2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = _http3.default.Server(app);
app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});
http.listen(3001, function () {
  console.log('listening on *:3000');
});
