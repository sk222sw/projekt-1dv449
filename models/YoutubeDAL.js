var credentials = require('./../modules/credentials');
var request = require('request');
var Promise = require('bluebird');
var Playlist = require('./Playlist');
var YTTrack = require('./YoutubeTrack');
var url = require('url');

var YoutubeDAL = function() {};

YoutubeDAL.prototype.GetJsonFromUrl = function(videoUrl) {
    var videoId = extractIdFromUrl(videoUrl);
    var apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=" + videoId + "&key=AIzaSyAEYt8wyj-woB5PQPYKUXci-KGPDlyjb_4";
    return new Promise(function(resolve, reject){
        request(apiUrl, function (err, res, rawJson) {
            if (err) { reject(err); }
            var json = JSON.parse(rawJson);
            resolve(json);
        });
    });
};

function extractIdFromUrl(videoUrl) {
    var parsedUrl = url.parse(videoUrl);
    var videoId = parsedUrl.query.slice(2, parsedUrl.query.length);
    return videoId;
}

module.exports = new YoutubeDAL();