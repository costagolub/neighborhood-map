'use strict';
define(['knockout', 'ui_strings', 'http', 'connectAPI', 'app/model'], 
	function(ko, uiStrings, http, connectAPI, model) {

	// Events
	function Events() {
		this.placeholderText = uiStrings.placeholderText;
		this.searchBtnText = uiStrings.searchBtnText;
		this.searchBtnEnable = ko.observable(false);
		this.cityName = ko.observable('');
		this.isBtnEnabled = ko.computed(function() {
			if (this.cityName() === '') {
				this.searchBtnEnable(false);
			} else {
				this.searchBtnEnable(true);
			}
		}, this);

		this.events = model.content.events;

		this.findAndSave = function() {
			var that = this;
			connectAPI.getEvents(that.cityName()).then(function(resolve, reject) {
				var events = JSON.parse(resolve);

				model.add(events);
				console.log(that.events());
			});
		};
	}

	return Events;
});