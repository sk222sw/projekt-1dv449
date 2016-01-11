var Playlist = function (title) {
    this.tracks = [];
    this.title = title || '';
};

Playlist.prototype.Add = function (track) {
    this.tracks.push(track)
};

module.exports = Playlist;