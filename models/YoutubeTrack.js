var YoutubeTrack = function(track) {
    this.type = "Youtube";
    this.number;
    this.title = track.items[0].snippet.title;
};

module.exports = YoutubeTrack;