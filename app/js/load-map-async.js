'use strict';

define('gmaps', ['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyC_rS0d1a-5LRjhUZxcP44UMO8SUXl8fQw'], function() {
	// simple return google constructor
	return window.google.maps;
});