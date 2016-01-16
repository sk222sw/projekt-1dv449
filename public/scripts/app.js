// var cId = "defe1307335b6141da3b5c880c33bbab";
// url: document.getElementById("trackUri").innerHTML+cId:	

var app = {
	currentTrackNumber: window.location.search.split("=")[1],
	currentTrack: {},
	playlistTracks: 0,
	playlist: {},

	GetPlaylistInfo: function (id) {
		var playlistPath = "/playlists/" + id + "/info";
		$(document).ready(function () {
			$.ajax({
				url: playlistPath,
				success: function (data) {
					app.playlist = {
						title: data.title,
						tracks: data.tracks
					};

					var currentTrack = app.playlist.tracks[app.currentTrackNumber];
					console.log(currentTrack)
					app.LoadTrack(currentTrack);
					app.PlaylistTracks = app.playlist.tracks.length;
				}

			});
		});
	},

	LoadTrack: function (track) {
		console.log(track)

		var widgetIframe = document.getElementById('sc-widget');
		var widget = SC.Widget(widgetIframe);
		widget.bind(SC.Widget.Events.READY, function(){
			widget.play();
		});

		widget.bind(SC.Widget.Events.FINISH, function() {
			var query = window.location.search;
			var trackQuery = query.split("=");
			var trackNumber = trackQuery[1];

			if (trackNumber < app.PlaylistTracks) {
				var newTrackNumber = parseInt(trackNumber, 10) + 1;
				window.location = window.location.origin + window.location.pathname + trackQuery[0] + "=" + newTrackNumber.toString();
			} else {
				$('#endMessage').html("Reached the end of ", app.playlist.title);
			}
		});
		
	}

};


app.GetPlaylistInfo("569514def5093ea1565fc021");
// app.LoadTrack();