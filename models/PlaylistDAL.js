var mongoose = require('mongoose');
var credentials = require("./../modules/credentials");
var Promise = require('bluebird');
var Playlistm = require('./Playlist');
var shortid = require('shortid');

mongoose.connect(credentials.mongo.development.connectionString);

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
   title: String,
   tracks: Array
});

var Playlist = mongoose.model('PlaylistSchema', PlaylistSchema);

var PlaylistDAL = function () {};

PlaylistDAL.prototype.AddPlaylistToDB = function (playlist) {
   generateTrackId();
   return new Promise(function(resolve, reject) {
      new Playlist({
         playlistId: shortId.generate(),
         title: playlist.title,
         tracks: []
      }).save(function(err) {
         if (err) { reject(err); }
         else { console.log() }
      })
   })
};

PlaylistDAL.prototype.DeletePlaylist = function(playlistId) {
   return new Promise(function(resolve, reject) {
      Playlist.remove({_id: playlistId}, function(err) {
         if( err ) reject(err);
         else resolve(true);
      });
   });
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

         pl.DistributeTrackNumbers();

         playlist.tracks = pl.tracks;

         playlist.save(function (err) {
            if(err) { reject(err); }
            else {
               resolve(true);
            }
         });
      });
   });
};

PlaylistDAL.prototype.DeleteTrack = function(playlistId, trackId) {
   return new Promise(function(resolve, reject){
      var i = 0;
      var arrayIndex;

      Playlist.findById(playlistId, function(err, playlist) {
         if (err) { reject(err); }

         var pl = new Playlistm();
         pl.tracks = playlist.tracks;

         while (i < pl.tracks.length) {
            if (pl.tracks[i].number === parseInt(trackId, 10)) {
               arrayIndex = i;
               break;
            }
            i++;
         }

         pl.tracks.splice(arrayIndex, 1);
         pl.DistributeTrackNumbers();
         playlist.tracks = pl.tracks;

         playlist.save(function (err) {
            if(err) { reject(err); }
            resolve(true);
         });
      });
   });
};

module.exports = new PlaylistDAL();