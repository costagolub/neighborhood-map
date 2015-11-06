'use strict';

require(['knockout', 'app/events', 'app/map'], function(ko, Events, map) {
	// ViewModels
	var events = new Events();
	map.customBindingGoogleMap();

	ko.applyBindings(events);
});