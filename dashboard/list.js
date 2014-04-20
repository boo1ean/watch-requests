var templates = require('./templates');

var root = document.getElementById('main');

var listify = function(obj) {
	var result = [];

	for (var name in obj) {
		result.push({
			name: name,
			value: obj[name]
		});
	}

	return result;
};

var prepareData = function(data) {
	data.headers = listify(data.headers);
	data.params = listify(data.params);
	data.query = listify(data.query);
	data.time = new Date(data.time);

	return data;
};

var toggleInfo = function(e) {
	if ('TD' === e.target.tagName) {
		return;
	}

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
		view.addEventListener('mousedown', toggleInfo);
		root.insertBefore(view, root.firstChild);
	}
};
