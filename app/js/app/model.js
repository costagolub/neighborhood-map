'use strict';
define(['knockout', 'exports'], function(ko, exports) {

	// MODEL
	var model = {
		content: {
			events: ko.observableArray(),
			pagination: ko.observable(),
			markers: ko.observableArray()
		},
		add : function(type, obj) {
			this.content[type](obj);
		},
		push: function(type, obj) {
			this.content[type].push(obj);
		},
		cleanArray: function(type) {
			var isArray = Array.isArray(this.content[type]());
			if (isArray) {
				this.content[type]().length = 0;
				console.log('Clean Marker Array');
			}
		}
	};

	return model;
});