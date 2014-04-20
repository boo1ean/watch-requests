var io = require('socket.io-client');
var list = require('./list');

var waiting = document.getElementById('waiting');
var url = document.getElementById('url');

if (url) {
	url.href = url.innerHTML = window.location.href;
}

var socket = io.connect('/');

socket.emit('subscribe', {
	room: window.location.pathname
});

socket.on('request', function(req) {
	if (waiting) {
		waiting.style.display = 'none';
	}

	list.append(req);
});
