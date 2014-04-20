var templates = require('./templates');

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
	data.time = new Date(data.time);

	return data;
};

var toggleInfo = function() {
	var info = this.querySelector('.info');

	if (info.style.display != 'block') {
		info.style.display = 'block';
	} else {
		info.style.display = 'none';
	}
};

module.exports = {
	append: function(req) {
		var view = document.createElement('div');
		view.innerHTML = templates['request'](prepareData(req));
		view.addEventListener('click', toggleInfo);
		root.insertBefore(view, root.firstChild);
	}
};
