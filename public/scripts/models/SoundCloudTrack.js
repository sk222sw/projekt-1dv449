"use strict";

//constructor
var SoundCloudTrack = function (SCTrackId, SCUserId, SCUser, SCTitle, SCArtworkUrl) {
    this.id = SCTrackId;
    this.user_id = SCUserId;
    this.user = SCUser;
    this.title = SCTitle;
    this.artwork_url = SCArtworkUrl;
};

