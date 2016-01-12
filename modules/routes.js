var Vacation = require('./../models/mongo.js');
var SoundCloudDAL = require('./../models/SoundCloudDAL');
var Playlist = require('./../models/Playlist');
var SCTrack = require('./../models/SoundCloudTrack');
var PlaylistDAL = require('./../models/PlaylistDAL');
var YoutubeDAL = require('./../models/YoutubeDAL');
var YTTrack = require('./../models/YoutubeTrack');

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});
	
	app.get('/playlists', function (req, res) {
		PlaylistDAL.GetAll()
		.then(function (result) {
			res.render('playlists', {
				playlists: result
			});
		});
	});
	
	app.get('/playlists/:id', function(req, res) {
		var showTrack = false;

		PlaylistDAL.GetPlaylistById(req.params.id)
		.then(function(playlist) {
		    if (req.query.track) {
		    	showTrack = true;
		    	PlaylistDAL.GetTrackByNumber(req.query.track, req.params.id)
		    	.then(function(trackJson) {
		    	    var track = new SCTrack(trackJson);
		    	    res.render('playlist', {
						playlist: playlist,
						showTrack: showTrack,
						track: track
					});
		    	});
		    } else {
				res.render('playlist', {
					playlist: playlist,
					showTrack: showTrack,
				});
		    }
		});
	});
	
	app.post('/playlists/:id', function(req, res) {
	    var url = req.body.fieldUrl;
	    var playlistId = req.params.id;
		var type = req.body.type;

		if (type === "soundcloud") {
		    SoundCloudDAL.GetJsonFromUrl(url)
		    .then(function JsonToSCTrack(json) {
		    	var track = new SCTrack(json);
		    	return track;
		    })
		    .then(function AddToDb(track) {
		    	PlaylistDAL.AddTrack(track, playlistId);
			    return res.redirect(303, '/playlists/'+playlistId);
		    });
		} else {
			YoutubeDAL.GetJsonFromUrl(url)
			.then(function CreateYTTrack(json) {
			    var track = new YTTrack(json);
			    return track;
			})
			.then(function AddToDb(track) {
				PlaylistDAL.AddTrack(track, playlistId);
				return res.redirect(303, '/playlists/'+playlistId);
			});
		}
	});
	
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