var request = require('request');
var Promise = require('bluebird');

var Vacation = require('./../models/mongo.js');
var SoundCloudDAL = require('./../models/SoundCloudDAL');
var Playlist = require('./../models/Playlist');
var SCTrack = require('./../models/SoundCloudTrack');
var PlaylistDAL = require('./../models/PlaylistDAL');

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});
	
	app.get('/playlists', function (req, res) {
		
		// var allPlaylists = PlaylistDAL.GetAll();
		// console.log(allPlaylists);
		PlaylistDAL.GetAll()
		.then(function (result) {
			// console.log(result);
			res.render('playlists', {
				playlists: result
			});
		})
		
	});
	
	app.get('/playlists/:id', function(req, res) {
		// console.log(req.params.id);
		PlaylistDAL.GetPlaylistById(req.params.id)
		.then(function (playlist) {
			res.render('playlist', {
				title: playlist.title,
				id: playlist.id
			});
		});
	});
	
	app.post('/playlists/:id', function(req, res) {
	    var url = req.body.fieldUrl;
	    var playlistId = req.params.id;

	    SoundCloudDAL.GetJsonFromUrl(url)
	    .then(function JsonToSCTrack(json) {
	    	var track = new SCTrack(json);
	    	console.log(track);
	    	return track;
	    })
	    .then(function AddToDb(track) {
	    	PlaylistDAL.AddTrack(track, playlistId)
		    return res.redirect(303, '/playlists/'+playlistId);
	    })
	    // console.log("NJE?");
	    // return res.redirect(303, '/playlists');
	    
	})
	
	app.post('/playlists', function(req, res) {
		// TODO FIX THIS 
	    var playlist = new Playlist(req.body.fieldPlaylistTitle);
	    
	    PlaylistDAL.AddPlaylistToDB(playlist);
	    
	    return res.redirect(303, '/playlists');
	});
	
	app.post('/', function (req, res) {
		var url = req.body.fieldUrl || '';
		
		SoundCloudDAL.GetJsonFromUrl(url)
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