(function() {
	'use strict';

	var mainCtrl = function($http) {
		var _self = this,
			_http = $http;

		var currentWeek = getCurrentWeekDates();
		_self.useCurrentWeek = true;
		_self.dataEntryCollection = angular.copy(currentWeek);

		_self.onDateSelected = function() {
			var momentDate = moment(_self.datePicker);
			_self.dataEntryCollection.length = 0;
			_self.dataEntryCollection = getWeekDaysFromDate(momentDate);
		};
	};

	mainCtrl.$inject = ['$http'];

	angular.module('app', ['ngMaterial'])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('pink')
				.accentPalette('orange');
		})
		.controller('mainCtrl', mainCtrl);


	function getWeekDaysFromDate(momentDate) {
		var dateEntries = [];
		var monday = moment(momentDate.startOf('isoWeek').day('monday'));
		var saturday = moment(momentDate.startOf('isoWeek').day('saturday'));

		for (var m = monday; m.isBefore(saturday); m.add(1, 'day')) {
			dateEntries.push(moment(m));
		}

		return dateEntries;
	}

	function getCurrentWeekDates() {
		var currentDate = moment();
		return getWeekDaysFromDate(currentDate);
	}

	function dataItem(date) {
		this.date = date;
		this.projectDataItems = [];
	}

	dataItem.prototype.addProjectData = function(project, time) {
		projectDataItems.push(new projectDataItem(project, time));
	}

	function projectDataItem(project, time) {
		this.project = project;
		this.time = time;
	}
}());


// function mainController($scope, $http) {
// 	$scope.formData = {};

// 	// when landing on the page, get all todos and show them
// 	// $http.get('/api/todos')
// 	// 	.success(function(data) {
// 	// 		$scope.todos = data;
// 	// 	})
// 	// 	.error(function(data) {
// 	// 		console.log('Error: ' + data);
// 	// 	});
// }