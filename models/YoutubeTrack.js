var YoutubeTrack = function(track) {
    this.type = "Youtube";
    this.number = 1;
    if (track.items == "undefined" || track.items == null) {
		// when the track has already been created and
		// is missing all the unnecessary info ( items.snippet etc)
		this.title = track.title;
		this.youtubeId = track.youtubeId;
    } else {
		// when the track is created the first time 
		// it's properties are assigned from the awkward
		// youtube json
		this.title = track.items[0].snippet.title;
		this.youtubeId = track.items[0].id;
    }

    this.artist = GetArtistName(this.title);
};

// this function will try to extract the artist name
// from the video title
function GetArtistName (title) {

	var artist = title.split("-")[0];
	return artist;

}

module.exports = YoutubeTrack;




	// console.log("track only",track);
	// console.log("track items", track.items);
 //    this.type = "Youtube";
 //    this.title = track.items[0].snippet.title;
 //    this.number = 1;
 //    this.youtubeId = track.items[0].id;