var templates = require('./templates');
var root = document.getElementById('main');

module.exports = {
	append: function(req) {
		var view = document.createElement('div');
		view.innerHTML = templates['request'](req);
		root.insertBefore(view, root.firstChild);
	}
};
