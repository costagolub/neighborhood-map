'use strict';
define(['exports', 'http'], function(exports, http) {
	
	function eventAPI() {
		var APIPublicKey = 'JVDBNBWYWNHIAEGR67OK',
				externalAPIURL = 'https://www.eventbriteapi.com/v3/';

		return function(city, pageNumbers) {
			var searchByCity = externalAPIURL + 'events/search/?token='+ APIPublicKey 
			+'&venue.city='+ city + '&page='+ pageNumbers +'&expand=venue';
			return http.get(searchByCity);
		}
	}

	exports.getEventsByCity = eventAPI();

});