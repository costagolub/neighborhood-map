'use strict';
define(['gmaps', 'exports', 'app/model', 'knockout'], function(gmaps, exports, model, ko) {

 	function Map() {
 		this.zoom = 2;
 		this.mapType = gmaps.MapTypeId.ROADMAP;
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
			        	center: new gmaps.LatLng(value.centerLat, value.centerLon),
			          mapTypeId: that.mapType
			        };
			        
			        // resolving the problem of initiation of the map ?
			       	setTimeout(function() {
			       		map = new gmaps.Map(element, mapOptions);
			        	map.setTilt(that.setTilt);  
			       	}, 0);
			  },
			  update: function(element, valueAccessor, allBindings, viewModel) {
			  	map = new gmaps.Map(element, {}); // clean map ?

			   		var value = ko.utils.unwrapObservable(valueAccessor()),
			   				bounds = new gmaps.LatLngBounds(),
			   				events = value.locations().map(function(events) {
			   					return events.venue
			   				}),
			   				infoWindow = new gmaps.InfoWindow(),
			   				infoWindowContent = model.content.events();

			   		model.cleanArray('markers'); // clean markers Array before poppulate it

			   		for (var event in events) {
			        var latLng = new gmaps.LatLng(
			        	ko.utils.unwrapObservable(events[event].latitude), 
				        ko.utils.unwrapObservable(events[event].longitude)
				      );

			        var marker = new gmaps.Marker({
			         	position: latLng,
			         	map: map
			        });

			        model.push('markers', marker); // push markers to model

			        gmaps.event.addListener(marker, 'click', (function(marker, i) {
			            return function() {
			            		// console.log('Load marker ', infoWindowContent[i]); // debug
			                infoWindow.setContent(infoWindowContent[i].description.html);
			                infoWindow.open(map, marker);
			            }
			        })(marker, event));


			        bounds.extend(latLng); // extend bounds
			        map.fitBounds(bounds); // fit bounds
			      }
			  }
			};
 		}
 	};
 	Map.prototype.constructor = Map;

	return Map;

});