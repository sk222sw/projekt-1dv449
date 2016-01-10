var mongoose = require('mongoose');
var credentials = require("./../modules/credentials");
var Promise = require('bluebird');

mongoose.connect(credentials.mongo.development.connectionString);

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
   title: String,
   tracks: Array
});

var Playlist = mongoose.model('PlaylistSchema', PlaylistSchema);

var PlaylistDAL = function () {};

PlaylistDAL.prototype.GetPlaylistFromDB = function () {
    
};

PlaylistDAL.prototype.AddPlaylistToDB = function (playlist) {

   new Playlist({
      title: playlist.title,
      tracks: []
   }).save();
   
};

PlaylistDAL.prototype.GetAll = function () {
   return new Promise(function (resolve, reject){
      Playlist.find({}, function (err, playlistsJson) {
         if (err) { reject(err); }
         resolve(playlistsJson);
      });
   })
};

PlaylistDAL.prototype.GetPlaylistById = function(id) {
   return new Promise(function(resolve, reject) {
      Playlist.findById(id, function(err, playlist) {
         if (err) { reject(err); }
         resolve(playlist);
      });
   });
};

PlaylistDAL.prototype.AddTrack = function(track, playlistId) {
   return new Promise(function(resolve, reject) {
      Playlist.findById(playlistId, function(err, playlist) {
         if (err) { reject(err); }
         
         // TODO use playlist.Add(track);
         
         playlist.tracks.push(track);
         console.log(playlist.tracks);
         playlist.save(function (err) {
            if(err) { reject(err); }
            console.log("updated playlist with id", playlistId);
         });
      });
   });
};

module.exports = new PlaylistDAL();