'use strict';

require(['knockout', 'app/events', 'app/map'], function(ko, Events, Map) {
	// ViewModels
	var events = new Events();
	var map = new Map; 

	map.customBindingGoogleMap();
	ko.applyBindings(events);
});