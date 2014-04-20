var express = require('express');
var ecstatic = require('ecstatic');

var port = 5000;
var app = express();

var staticOptions = {
	root: __dirname + '/../static',
	showDir: false
};

app.use(ecstatic(staticOptions));

app.all('*', function(req, res) {
	res.sendfile(__dirname + '/views/index.html');
});

app.listen(port);
