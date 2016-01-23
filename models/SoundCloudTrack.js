var SoundCloudTrack = function(track) {
    this.type = "SoundCloud";
    this.title = track.title;
    this.number = 1;
    this.uri = track.uri;
    this.user = {
        SCId: track.user.id,
        SCUsername: track.user.username,
    };
    this.artist = this.user.SCUsername;
    // console.log("scusername",this.user.SCUsername);
};

module.exports = SoundCloudTrack;
