var mongoose = require('mongoose');
var credentials = require("./../modules/credentials");
var Promise = require('bluebird');
var Playlistm = require('./Playlist');

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
   });
};

PlaylistDAL.prototype.GetPlaylistById = function(id) {
   return new Promise(function(resolve, reject) {
      Playlist.findById(id, function(err, playlist) {
         if (err) { reject(err); }
         resolve(playlist);
      });
   });
};

PlaylistDAL.prototype.GetTrackByNumber = function(number, playlistId) {
   return new Promise(function(resolve, reject){
      Playlist.findById(playlistId, function(err, playlist) {
         if (err) { reject(err); }
         resolve(playlist.tracks[number - 1]);
      });
   });
};

PlaylistDAL.prototype.AddTrack = function(track, playlistId) {
   return new Promise(function(resolve, reject) {
      Playlist.findById(playlistId, function(err, playlist) {
         if (err) { reject(err); }

         var pl = new Playlistm();
         pl.tracks = playlist.tracks;
         playlist.tracks.push(track);
         
         // redistribute playlist track numbers
         // in case a delete or update messed them up
         pl.DistributeTrackNumbers();

         playlist.tracks = pl.tracks;

         playlist.save(function (err) {
            if(err) { reject(err); }
            console.log("added track to playlist with id", playlistId);
         });
      });
   });
};

PlaylistDAL.prototype.DeleteTrack = function(playlistId, trackId) {
   var i = 0;
   var arrayIndex;

   console.log("delete", trackId);
   Playlist.findById(playlistId, function(err, playlist) {
      if (err) { reject(err); }

      var pl = new Playlistm();
      pl.tracks = playlist.tracks;

      while (i < pl.tracks.length) {
         console.log("number", pl.tracks[i].number);
         if (pl.tracks[i].number === parseInt(trackId, 10)) {
            arrayIndex = i;
            console.log("FOUND IT");
            break;
         }
         i++;
      }

      pl.tracks.splice(arrayIndex, 1);
      pl.DistributeTrackNumbers();
      playlist.tracks = pl.tracks;

      playlist.save(function (err) {
         if(err) { reject(err); }
         console.log("deleted", trackId);
      });



   })
};

module.exports = new PlaylistDAL();