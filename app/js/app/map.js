'use strict';
define(['load-map-async', 'exports', 'app/model', 'knockout'], function(google, exports, model, ko) {


 	function Map() {
 		this.map = null;
 	};

 	Map.prototype = {
 		customBindingGoogleMap: function () {
 			var that = this;

 			ko.bindingHandlers.googlemap = {
		    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			    var value = valueAccessor(),
			        mapOptions = {
			          zoom: 3,
			        	center: new google.maps.LatLng(value.centerLat, value.centerLon),
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			        
			        that.map = new google.maps.Map(element, mapOptions);
			        that.map.setTilt(45);
			         
			   },
			   update: function(element, valueAccessor, allBindings, viewModel) {
			   	that.map = new google.maps.Map(element, {});

			   		var value = ko.utils.unwrapObservable(valueAccessor()),
			   				bounds = new google.maps.LatLngBounds(), //instantiate bounds
			   				events = value.locations().map(function(events) {
			   					return events.venue
			   				}); 

			   		for (var event in events) {
			        var latLng = new google.maps.LatLng(
			        	ko.utils.unwrapObservable(events[event].latitude), 
				        ko.utils.unwrapObservable(events[event].longitude)
				      );

			        bounds.extend(latLng); // extend bounds

			        console.log(that.map);
			        var marker = new google.maps.Marker({
			         	position: latLng,
			         	map: that.map
			        });

			        that.map.fitBounds(bounds); // fit bounds
			      }

			   }
			};
 		}
 	};


	return new Map;

});