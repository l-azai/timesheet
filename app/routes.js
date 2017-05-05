require('chromedriver');

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    moment = require('moment'),
    config = require('../config');

module.exports = function(app) {

    app.get('/api/defaultdata', function(req, res) {
        var model = {
            projects: config.projects,
            hours: config.hours,
            minutes: config.minutes
        };

        res.send(model);
    });

    app.post('/api/postentry', function(req, res) {
        var dataEntries = req.body;

        var options = new chrome.Options();
        options.addArguments('--incognito', '--start-maximized');

        // var driver = new webdriver.Builder()
        //     .forBrowser('chrome')
        //     .setChromeOptions(options)
        //     .build();

        dataEntries.forEach(function(entry, index) {
            console.log(moment(entry.date));
            console.log(moment(entry.date).format('dd MM YYYY'));
            console.log(entry);
        });

        res.send();
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};