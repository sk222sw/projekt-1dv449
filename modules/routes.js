var SoundCloudDAL = require('./../models/SoundCloudDAL');
var Playlist = require('./../models/Playlist');
var SCTrack = require('./../models/SoundCloudTrack');
var PlaylistDAL = require('./../models/PlaylistDAL');
var YoutubeDAL = require('./../models/YoutubeDAL');
var YTTrack = require('./../models/YoutubeTrack');
var TrackDAL = require("./../models/TrackDAL");
var url = require("url");

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});
	
	app.get('/playlists/', function (req, res) {

		console.log(url.parse(req.url, true));
		PlaylistDAL.GetAll()
		.then(function (result) {
			res.render('playlists', {
				playlists: result
			});
		});
	});
	
	app.get('/playlists/:id', function(req, res) {
		var showTrack = false;
		if (req.query.delete) {
			var parts = url.parse(req.url, true);
			var playlistId = parts.pathname.split("/playlists/")[1];

			if (req.query.delete === "playlist") {
				PlaylistDAL.DeletePlaylist(playlistId)
				.then(function(){
					return res.redirect(303, '/playlists');
				})
			} else if (req.query.delete == "track") {
				var trackNumber = req.query.track;
				 PlaylistDAL.DeleteTrack(req.params.id, trackNumber)
				 .then(function(){
						return res.redirect(303, '/playlists/'+playlistId);
				 });
			}
		}	else {
			var render = function(playlist, track) {
				res.render('playlist', {
					playlist: playlist,
					showTrack: showTrack,
					track: track
				});
			};
		}

		PlaylistDAL.GetPlaylistById(req.params.id)
		.then(function(playlist) {
			if (req.query.track) {
			showTrack = true;
				PlaylistDAL.GetTrackByNumber(req.query.track, req.params.id)
				.then(function(trackJson) {
					var track;
					if (trackJson.type === "SoundCloud") {
						track = new SCTrack(trackJson);
					} else if (trackJson.type === "Youtube") {
						track = new YTTrack(trackJson);
					}
					render(playlist, track);
				});
			} else {
				render(playlist, null);
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
				console.log("craeted soundcloudtrack");
				var track = new SCTrack(json);
				return track;
			})
			.then(function AddToDb(track) {
				return PlaylistDAL.AddTrack(track, playlistId);
			})
			.then(function redir() {
					return res.redirect(303, '/playlists/'+playlistId);
			})
		} else {
			YoutubeDAL.GetJsonFromUrl(url)
			.then(function CreateYTTrack(json) {
				console.log("craeted youtubetrack");
				var track = new YTTrack(json);
				return track;
			})
			.then(function AddToDb(track) {
				return PlaylistDAL.AddTrack(track, playlistId);
			})
			.then(function redir(){
				return res.redirect(303, '/playlists/'+playlistId);
			})
		}
	});

	app.get('/playlists/:id/info', function (req, res) {
		var playlistId = req.params.id;
		PlaylistDAL.GetPlaylistById(playlistId)
		.then(function (data) {
			res.send(data);
		});
	});

	app.post('/playlists', function(req, res) {
		// TODO FIX THIS 
		var playlist = new Playlist(req.body.fieldPlaylistTitle);

		PlaylistDAL.AddPlaylistToDB(playlist)
		.then(function() {
			return res.redirect(303, '/playlists'+id);
		});

	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};