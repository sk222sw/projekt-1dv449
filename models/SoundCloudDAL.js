var credentials = require('./../modules/credentials');
var request = require('request');
var Promise = require('bluebird');
var Playlist = require('./Playlist');

var SoundCloudDAL = function () {};

SoundCloudDAL.prototype.GetJsonFromUrl = function (url) {
    // url = "https://soundcloud.com/ben-klock/ben-klock-subzero-original-mix";
    var str = "https://api.soundcloud.com/resolve.json?url="+url+"&client_id="+credentials.soundcloud.client_id;
    return new Promise(function (resolve, reject) {
        request(str, function (err, res, rawJson) {
            if (err) { reject(err); }
            var json = JSON.parse(rawJson);
            resolve(json);
        });
    });
};

SoundCloudDAL.jsonToObject = function (json) {
    
}

module.exports = new SoundCloudDAL();



