var io = require('socket.io-client');
var list = require('./list');

var socket = io.connect('/');

socket.emit('subscribe', {
	room: window.location.pathname
});

socket.on('request', function(req) {
	list.append(req);
});
