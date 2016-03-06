function Playlist(title) {
    this.tracks = [];
    this.title = title || '';
}

Playlist.prototype.DistributeTrackNumbers = function () {
    // redistribute playlist track numbers
    // in case a delete or update messed them up
    for (var i = 0; i < this.tracks.length; i++) {
        this.tracks[i].number = i + 1;
    }
};

module.exports = Playlist;