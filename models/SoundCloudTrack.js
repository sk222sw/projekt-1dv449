var SoundCloudTrack = function(track) {
    this.title = track.title;
    this.user = {
        SCId: track.user.id,
        SCUsername: track.user.username,
    };
};

module.exports = SoundCloudTrack;
