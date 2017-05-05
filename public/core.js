(function() {
    'use strict';

    var mainCtrl = function($http) {
        var _self = this;

        $http.get('/api/defaultdata').then(function(response) {
            _self.projects = response.data.projects;
            _self.hours = response.data.hours;
            _self.minutes = response.data.minutes;
        });

        var currentWeek = getCurrentWeekDates();
        _self.useCurrentWeek = true;
        _self.dataEntryCollection = angular.copy(currentWeek);

        _self.onDateSelected = function() {
            var momentDate = moment(_self.datePicker);
            _self.dataEntryCollection.length = 0;
            _self.dataEntryCollection = getWeekDaysFromDate(momentDate);
        };

        _self.addProjectData = function(form, entry) {
            if (!form.$valid) return;

            var strTime = entry.tempHour + ':' + entry.tempMinute;
            entry.addProjectData(entry.tempProject, strTime);
            entry.clearTempData();
        };

        _self.submit = function() {
            debugger;
            var formData = {};
            var entries = _self.dataEntryCollection.filter(function(item) { return item.projectDataItems.length > 0 });
            formData.entries = entries;
            $http.post('/api/postentry', entries).then(function() {
                debugger;
            });
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
            dateEntries.push(new dataItem(moment(m).utcOffset('+0200')));
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
        this.projectDataItems.push(new projectDataItem(project, time));
    }

    dataItem.prototype.clearTempData = function() {
        this.tempProject = '';
        this.tempHour = '';
        this.tempMinute = '';
    }

    function projectDataItem(project, time) {
        this.project = project;
        this.time = time;
    }
}());