var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var path = require('path');
var _ = require('lodash');
var bodyParser = require('body-parser');

var port = 5000;
var app = express();
var server = http.createServer(app).listen(port)
var io = socketio.listen(server);
var html = path.resolve(__dirname + '/views/index.html');

app.use(bodyParser());
app.use(express.static(__dirname + '/../static'));

app.all('*', function(req, res) {
	var payload = _.pick(req, ['headers', 'path', 'body', 'query']);
	io.sockets.in(req.path).emit('request', payload);
	res.sendfile(html);
});

io.sockets.on('connection', function(socket) {
	socket.on('subscribe', function(data) {
		socket.join(data.room);
	})
});
