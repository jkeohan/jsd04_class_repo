// Keep your npm modules and other file dependencies at the top
var express = require('express');
var path = require('path');
var faker = require('faker');
var request = require('request');

// Create a new express instance and point to it using the variable app
var app = express();

// MIDDLEWARE - methods that run before our routes are fired; will utilize the .use() method

// Tells express where to find static assets (html, css, js); in this case - the "public" directory
app.use(express.static('public'));


// ROUTES - functions that will receive and respond to various HTTP requests

// listens for HTTP requests to the root, "/", of our server
app.get('/', function (req, res) {
	// sends back the "index.html" file; Node is looking in the "public" directory for this
	res.send('index.html');
});

app.get('/geo', function (req, res) {
	var latitude = faker.address.latitude();
	var longitude = faker.address.longitude();

	var weatherKey = '19ab861f15cfd2e8216a3be1ed615598';
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherKey

	// uses the "request" package to make a HTTP request from the Node server to the OpenWeatherMap API
	request(weatherURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send({
				weather: JSON.parse(body),
				lat: latitude,
				lng: longitude,
			});
		}
	})
});

// Kicks off the server; tells it to listen for incoming request on port 1337
app.listen(1337, function () {
	console.log('The magic is going down on 1337!')
});
