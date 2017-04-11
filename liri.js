'use strict';

// Requiring keys.js, fs, twtter, spotify, and request
const keys = require('./keys.js');
const Twitter = require('twitter');
const spotify = require('spotify');
const request = require('request');
const fs = require('fs')

// Takes user-specified functionality and runs associated function:
var command = process.argv[2];

switch (command) {
	case 'my-tweets':
		tweets20();	
		break;

	case 'spotify-this-song':
		spotifySong();
		break;

	case 'movie-this':
		movieInfo();
		break;

	case 'do-what-it-says':
		randomTxt();
		break;
	default:
		console.log('Sorry, that isn\'t an available option.');
}

// Twitter package function
function tweets20() {
	var client = new Twitter(keys.twitterKeys);

	// Search parameters for my Twitter account and last 20 tweets
	var params = {
		screen_name: 'AngeloFlorendo',
		count: 20,
	}
	
	client.get('statuses/user_timeline', params, function (err, tweets, response) {
		if (err) {
			console.error(err)
		}
		else {
			for (var i = 0; i < tweets.length; i++) {
				console.log(JSON.stringify(tweets[i].text))
			}
		}
	})
}