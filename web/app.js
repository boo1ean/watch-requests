var http = require('http');

var port = 5000;

var handler = function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
};

var server = http.createServer(handler);

server.listen(port);
