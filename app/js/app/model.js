'use strict';
define(['knockout', 'exports'], function(ko, exports) {

	// MODEL
	var model = {
		content: {
			events: ko.observableArray(),
			pagination: ko.observable()
		},
		add : function(obj) {
			this.content.events(obj.events);
			this.content.pagination(obj.pagination);
		}
	};

	return model;
});