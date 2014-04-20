var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var path = require('path');

var port = 5000;
var app = express();
var server = http.createServer(app).listen(port)
var io = socketio.listen(server);
var html = path.resolve(__dirname + '/views/index.html');

app.use(express.static(__dirname + '/../static'));

app.all('*', function(req, res) {
	res.sendfile(html);
});

io.sockets.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
});
