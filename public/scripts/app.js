var app = {
	currentTrackNumber: window.location.search.split("=")[1],
	currentTrack: {},
	playlistTracks: 0,
	playlist: {},
	ytplayer: undefined,
	playlistId: window.location.pathname.split("/")[2],

	init: function () {
		app.GetPlaylistInfo(app.playlistId);
		$('#showSimilar').click(function () {
			app.GetSimilarArtists();
		});
		$('#showBio').click(function () {
			app.GetArtistBio();
		});
		$('.deleteTrack').click(function () {
			var id = $(this).attr('id').slice(5, 6);

			app.DeleteTrack(id);
		});
	},

	DeleteTrack: function (id) {
		console.log('/playlists/'+app.playlistId+"/delete/"+id);
		$.ajax({
			url: '/playlists/'+app.playlistId+"/delete/"+id,
			type: 'DELETE',
			data: {'trackId': id}
		});
	},

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
	},

	GetSimilarArtists: function () {
		var similarArtists = [];
		var requestUrl = "http://developer.echonest.com/api/v4/artist/similar?api_key=XVTRPGOZVB0DFU6TB&name="+app.currentTrack.artist;

		$.getJSON(requestUrl, function (data) {
			if (data.response.artists.length === 0) {
				$('#similarArtistsArea ul').append("<p>Sorry - no similar artists found.</p>");
			} else {
				for (var i = 0; i <= data.response.artists.length - 1; i++) {
					var li = "<li>" + data.response.artists[i].name + "</li>";
					$('#similarArtistsArea ul').append(li);
				}
			}
		})
		.fail(function () {
			console.log("error");
		});
	},

	GetArtistBio: function () {
		var artistName = app.currentTrack.artist;
		var requestArtistInfo = "http://developer.echonest.com/api/v4/artist/search?api_key=FILDTEOIK2HBORODV&name="+artistName;
		
		$.getJSON(requestArtistInfo, function (data) {
			var echonestArtist = data.response.artists[0];
			if (data.response.artists.length) {
				var requestBio = "http://developer.echonest.com/api/v4/artist/biographies?api_key=FILDTEOIK2HBORODV&id="+echonestArtist.id+"&format=json&results=1&start=0&license=cc-by-sa";
				$.getJSON(requestBio, function (data) {
					if (data.response.biographies.length === 0) {
						$('#bio').html("Sorry - no biography available.");
					} else {
						var bioText = data.response.biographies[0].text + " src: " + data.response.biographies[0].site;
						$('#bio').html(bioText);
					}
				});
			} else {
				$('#bio').html("Sorry - no biography available.");
			}
		});
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

app.init();