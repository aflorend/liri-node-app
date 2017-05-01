'use strict';

// Requiring keys.js, fs, twtter, spotify, and request
const keys = require('./keys.js');
const Twitter = require('twitter');
const spotify = require('spotify');
const request = require('request');
const fs = require('fs')

var command;
var textQuery;

// First checks if do-what-it-says is used, then reads text file for instructions
if (process.argv[2] === 'do-what-it-says') {
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			console.error(err);
		}
		else {
			var dataArr = data.split(',');

			command = dataArr[0];
			textQuery = dataArr[1];

			runCommand();
		};
	});
}
else {
	command = process.argv[2];

	runCommand();
};

// Takes user-specified command and runs associated function:
function runCommand() {
	switch (command) {
		case 'my-tweets':
			tweets20();
			break;

		case 'spotify-this-song':
			spotifySong(textQuery);
			break;

		case 'movie-this':
			movieInfo(textQuery);
			break;

		default:
			console.log('Please type one of the following: "my-tweets," "spotify-this-song," "movie-this," or "do-what-it-says."');
	};
};

// Twitter package function
function tweets20() {
	var client = new Twitter(keys.twitterKeys);

	// Search parameters for my Twitter account and last 20 tweets
	var params = {
		screen_name: 'AngeloFlorendo',
		count: 20,
	};
	
	client.get('statuses/user_timeline', params, function (err, tweets, response) {
		if (err) {
			console.error(err);
		}
		else {
			// Looping through results and printing needed info from the tweets object
			for (var i = 0; i < tweets.length; i++) {
				console.log('Tweet #' + (i+1) + ': ' + tweets[i].text);
				console.log('Created at: ' + tweets[i].created_at);
				console.log('========================================');
			};
		};
	});
};

// Spotify package function
function spotifySong(doThisText) {
	var songTitle;

	if (doThisText) {
		songTitle = doThisText
	} 
	// Defaults to Ace of Base
	else if (!process.argv[3]) {
			songTitle = 'The Sign Ace of Base'
	}
	else {
		songTitle = process.argv[3];
	};

	// Searches and prints results from response object
	spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			console.error(err);
		}
		else {
			console.log('Artist: '+ data.tracks.items[0].album.artists[0].name);
			console.log('Song link: ' + data.tracks.items[0].album.artists[0].external_urls.spotify);
			console.log('Album title: ' + data.tracks.items[0].album.name);
			console.log('Song title: ' + data.tracks.items[0].name);
		};
	});
};

// OMDB function
function movieInfo(doThisText) {
	var movieTitle;

	if (doThisText) {
		movieTitle = doThisText;
	}
	// Defaults to Mr. Nobody
	else if (!process.argv[3]) {
			movieTitle = 'mr+nobody'
	}
	else {
		movieTitle = process.argv[3];
	};

	// Request package to request from OMDB API
	request('http://www.omdbapi.com/?type=movie&plot=short&t=' + movieTitle, function(err, response, body) {
		if (err) {
			console.error(err);
		} else {
			var movieData = JSON.parse(body)
			
			console.log('Movie title: ' + movieData.Title);
			console.log('Year of Release: ' + movieData.Year);
			console.log('IMDB Rating: ' + movieData.Ratings.imdbRating);
			console.log('Country of Production: ' + movieData.Country);
			console.log('Plot: ' + movieData.Plot);
			console.log('Actors: ' + movieData.Actors);
			console.log('RT rating: ' + movieData.Ratings[1].Value);
		};
	});
};