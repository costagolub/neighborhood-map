'use strict';
define(['load-map-async', 'exports', 'app/model', 'knockout'], function(google, exports, model, ko) {

 	function Map() {
 		this.zoom = 2;
 		this.mapType = google.maps.MapTypeId.ROADMAP;
 		this.setTilt = 45;
 	};

 	Map.prototype = {
 		customBindingGoogleMap: function () {
 			var that = this,
 					map; 

 			ko.bindingHandlers.googlemap = {
		    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			    var value = ko.utils.unwrapObservable(valueAccessor()),
			        mapOptions = {
			          zoom: that.zoom,
			        	center: new google.maps.LatLng(value.centerLat, value.centerLon),
			          mapTypeId: that.mapType
			        };
			        
			        // resolving the problem of initiation of the map ?
			       	setTimeout(function() {
			       		map = new google.maps.Map(element, mapOptions);
			        	map.setTilt(that.setTilt);  
			       	}, 0);
			  },
			  update: function(element, valueAccessor, allBindings, viewModel) {
			  	map = new google.maps.Map(element, {}); // clean map ?

			   		var value = ko.utils.unwrapObservable(valueAccessor()),
			   				bounds = new google.maps.LatLngBounds(),
			   				events = value.locations().map(function(events) {
			   					return events.venue
			   				}),
			   				infoWindow = new google.maps.InfoWindow(),
			   				infoWindowContent = model.content.events();

			   		for (var event in events) {
			        var latLng = new google.maps.LatLng(
			        	ko.utils.unwrapObservable(events[event].latitude), 
				        ko.utils.unwrapObservable(events[event].longitude)
				      );

			        var marker = new google.maps.Marker({
			         	position: latLng,
			         	map: map
			        });
			      
			        google.maps.event.addListener(marker, 'click', (function(marker, i) {
			            return function() {
			                infoWindow.setContent(infoWindowContent[i].description.html);
			                infoWindow.open(map, marker);
			            }
			        })(marker, event));


			        bounds.extend(latLng); // extend bounds
			        map.fitBounds(bounds); // fit bounds

			        console.log(that.map); // debug
			      }
			  }
			};
 		}
 	};
 	Map.prototype.constructor = Map;

	return Map;

	return initializeMap;

});