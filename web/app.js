var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var resolve = require('path').resolve;
var _ = require('lodash');
var bodyParser = require('body-parser');

var port = 5000;
var app = express();
var server = http.createServer(app).listen(port)
var io = socketio.listen(server);
var index = resolve(__dirname + '/views/index.html');
var dashboard = resolve(__dirname + '/views/dashboard.html');
var props = ['headers', 'path', 'body', 'query', 'method'];

app.use(bodyParser());
app.use(express.static(__dirname + '/../static'));

var payload = function(req) {
	var result = _.pick(req, props);
	result.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	result.time = new Date().getTime();
	return result;
};

app.get('/', function(req, res) {
	res.sendfile(index);
});

app.all('*', function(req, res) {
	io.sockets.in(req.path).emit('request', payload(req));
	res.sendfile(dashboard);
});

io.sockets.on('connection', function(socket) {
	socket.on('subscribe', function(data) {
		socket.join(data.room);
	})
});
