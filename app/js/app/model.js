'use strict';
define(['knockout', 'exports'], function(ko, exports) {

	// MODEL
	var model = {
		content: [],
		add : function(something) {
			this.content.push(something);
		}
	};

	return model;
});