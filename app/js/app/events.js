'use strict';
define(['knockout', 'ui_strings', 'connectAPI', 'app/model', 'app/map'], 
	function(ko, uiStrings, connect, model, map) {

	// Events
	function Events() {
		this.placeholderText = ko.observable(uiStrings.placeholderText);
		this.searchBtnText = ko.observable(uiStrings.searchBtnText);
		this.cityName = ko.observable('');
		this.searchBtnEnable = ko.observable(false);
		this.prevBtnEnable = ko.observable(false);
		this.nextBtnEnable = ko.observable(false);

		this.isBtnEnabled = ko.computed(function() {
			if (this.cityName() === '') {
				this.searchBtnEnable(false);
			} else {
				this.searchBtnEnable(true);
			}
		}, this);

		this.nextEvents = function() {
			this.loadMore(this.cityName(), ++this.current);
		};
		this.prevEvents = function() {
			this.loadMore(this.cityName(), --this.current);
		};

		this.events = model.content.events;
		this.pagination = model.content.pagination;
	}

	Events.prototype = {
		loadMore: function(city, pageNumbers) {
			var that = this;
			this.searchBtnEnable(false);
			this.prevBtnEnable(false);
			this.nextBtnEnable(false);	

			connect.getEventsByCity(city, pageNumbers).then(function(resolve, reject) {
				var events = JSON.parse(resolve);
				model.add(events); // save to model					

				console.log('load ', events); // debug
				return events;
			}).then(function(events, reject) {
				that.searchBtnEnable(true);
				that.prevBtnEnable(true);
				that.nextBtnEnable(true);	

				that.pagesInit(events);
			});
		},

		findEvents : function() {	
			var pageNumber = 1; // start at 1st page
			this.loadMore(this.cityName(), pageNumber);
		},

		pagesInit: function(events) {
			var pg = events.pagination; // private

			this.current = pg.page_number;
			this.total = pg.page_count;

			console.log(this); // debug

			if (this.current == 1) {
				this.prevBtnEnable(false);
				if (this.total > 1) {
					this.nextBtnEnable(true);
				} else {
					this.nextBtnEnable(false);
				}
			} else if (this.current == this.total) {
				this.prevBtnEnable(true);
				this.nextBtnEnable(false);
			} else {
				this.prevBtnEnable(true);
				this.nextBtnEnable(true);
			}
		}
	};
	Events.constructor = Events;

	return Events;

});