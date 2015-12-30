var request = require('request');
var Promise = require('bluebird');

var Vacation = require('./../models/mongo.js');
var SoundCloudDAL = require('./../models/SoundCloudDAL');
var Playlist = require('./../models/Playlist');
var SCTrack = require('./../models/SoundCloudTrack');

var tempPlaylist = new Playlist();
var tempJSON = SoundCloudDAL.getJsonFromUrl();
// var tempTrack = new SCTrack(tempJSON);

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		SoundCloudDAL.getJsonFromUrl()
		.then(function (json) {
			res.render('home', {
				track: json.title
			});
		})
	});

	app.post('/', function (req, res) {
		var url = req.body.fieldUrl || '';
		
		SoundCloudDAL.getJsonFromUrl(url)
		.then(function(json) {
	   		var track = new SCTrack(json);
	   		return track;
		})
		.then(function(track) {
			if (req.xhr) return res.json({success: true});
			req.session.flash = {
				type: 'success',
				intro: 'Thank yousdfsdf!',
				message: 'Awesome url, dude!'
			};
			
			return res.redirect(303, "/");
		});
	});

	//sample from book as a blueprint - to be deleted
	app.get('/vacations', function(req, res){
		Vacation.find({ 'type': 'SoundCloud'}, function (err, vacations) {
			console.log(vacations)
			var context = {
				vacations: vacations.map(function(vacation){
					return {
						url: vacation.url
					}
				})
			};
			res.render('vacations', context);
		});
	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};