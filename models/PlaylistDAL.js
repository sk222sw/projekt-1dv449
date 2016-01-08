var mongoose = require('mongoose');
var credentials = require("./../modules/credentials");

mongoose.connect(credentials.mongo.development.connectionString);

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
   title: String,
   tracks: Array
});

var Playlist = mongoose.model('PlaylistSchema', PlaylistSchema);

var PlaylistDAL = function () {};

PlaylistDAL.prototype.getPlaylistFromDB = function () {
    
};

PlaylistDAL.prototype.addPlaylistToDB = function (playlist) {

   new Playlist({
      title: playlist.title,
      tracks: []
   }).save();
   
};

module.exports = new PlaylistDAL();