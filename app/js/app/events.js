'use strict';
define(['knockout', 'ui_strings', 'http', 'connectAPI', 'app/model'], 
	function(ko, uiStrings, http, connectAPI, model) {

	// Pagination
	// if there are more then one page in obrained object 
	function Pagination(JSONobj) {
		if (!JSONobj) return;

		this.currentPage = JSONobj.pagination.page_number;
		this.totalPages = JSONobj.pagination.page_count;
	}


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

		this.findEvents = function() {
			var that = this;

			connectAPI.getEvents(that.cityName()).then(function(resolve, reject) {
				var JSONParse = JSON.parse(resolve);
				// populate model with obtained results
				model.add(JSONParse);

				console.log(JSONParse); // check if we get data of events at the end 
				console.log(model); // check if model array are populated
			});
		}
	}

	return Events;
});