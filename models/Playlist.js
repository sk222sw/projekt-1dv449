var Playlist = function (title) {
    this.tracks = [];
    this.title = title || '';
};

Playlist.prototype.add = function (track) {
    this.tracks.push(track)
};

module.exports = Playlist;