// var cId = "defe1307335b6141da3b5c880c33bbab";
// url: document.getElementById("trackUri").innerHTML+cId:	


var app = {
	currentTrackNumber: window.location.search.split("=")[1],
	currentTrack: {},
	playlistTracks: 0,
	playlist: {},
	ytplayer: undefined,

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
					app.currentTrack = app.playlist.tracks[app.currentTrackNumber - 1];

					app.LoadTrack(app.currentTrack);
					app.PlaylistTracks = app.playlist.tracks.length;
				}

			});
		});
	},

	LoadTrack: function (track) {
		if (track.type === "SoundCloud") {
			app.LoadSoundCloudTrack(track);
		} else if (track.type === "Youtube") {
			console.log(track);
			app.currentTrack = track;
			app.LoadYoutubeTrack(track);
		}
	},

	LoadSoundCloudTrack: function (track) {

		var iframeString = "<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url="+ track.uri + "'></iframe>";

		$('#trackPlayer').html(iframeString);

		var widgetIframe = document.getElementById('sc-widget');
		var widget = SC.Widget(widgetIframe);
		widget.bind(SC.Widget.Events.READY, function(){
			widget.play();
		});

		widget.bind(SC.Widget.Events.FINISH, function() {
			app.AutoLoadNextTrack();
		});
	},

	// the global onYouTubeIframeAPIReady is called automatically
	// then the youtube embed api script is loaded, so i must add
	// it manually in or onYouTubeIframeAPIReady will fire when
	// the script is loaded from the html-page and prevent me from
	// setting the videoId.
	LoadYoutubeTrack: function (track) {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	},

	AutoLoadNextTrack: function () {
		var query = window.location.search;
		var trackQuery = query.split("=");
		var trackNumber = trackQuery[1];

		if (trackNumber < app.PlaylistTracks) {
			var newTrackNumber = parseInt(trackNumber, 10) + 1;
			window.location = window.location.origin + window.location.pathname + trackQuery[0] + "=" + newTrackNumber.toString();
		} else {
			$('#endMessage').html("Reached the end of ", app.playlist.title);
		}
	}
};

// onYouTubeIframeAPIReady must be global to work for some reason
// (http://stackoverflow.com/a/28348510)
window.onYouTubeIframeAPIReady = function () {
	app.ytplayer = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: app.currentTrack.youtubeId,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
	function onPlayerReady(event) {
		event.target.playVideo();
	}

	function onPlayerStateChange (state) {
		if (state.data === 0) {
			app.AutoLoadNextTrack();
		}
	}

};
// get the playlist id from the query
app.GetPlaylistInfo(window.location.pathname.split("/")[2]);