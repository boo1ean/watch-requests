var templates = require('./templates');
var moment = require('moment');

var root = document.getElementById('main');

var prepareData = function(data) {
	var headers = [];

	for (var name in data.headers) {
		headers.push({
			name: name,
			value: data.headers[name]
		});
	}

	data.headers = headers;
	data.time = moment(data.time).format();

	return data;
};

module.exports = {
	append: function(req) {
		var view = document.createElement('div');
		view.innerHTML = templates['request'](prepareData(req));
		root.insertBefore(view, root.firstChild);
	}
};
