const Promise = require("bluebird");
const mongoose = require("mongoose");

mongoose.connect("mongodb://sonny:123@ds037165.mlab.com:37165/playlist")

const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  title: String,
  tracks: Array
});

const Playlist = mongoose.model("PlaylistSchema", PlaylistSchema);

const DAL = function () {};

DAL.prototype.getPlaylist = function(_id) {
  return new Promise((resolve, reject) => {
    Playlist.find({_id}, (err, json) => {
      if (err) { reject(err); }
      resolve(json);
    });
  });
};

DAL.prototype.addTrack = function (playlistId, track) {
  return new Promise((resolve, reject) => {
    Playlist.findById(playlistId, (err, playlist) => {
      if (err) { reject(err); }
      playlist.tracks.push(track);
      playlist.save(err => {
        if (err) { reject(err); }
        else {
          resolve(true);
        }
      })
    })
  });
}

DAL.prototype.deleteTrack = function (playlistId, track) {
  return new Promise((resolve, reject) => {
    Playlist.findById(playlistId, (err, playlist) => {
      if (err) { reject(err); }

      var trackIndex = null;
      for (var i = 0; i < playlist.tracks.length; i++) {
        if (playlist.tracks[i].id === track) {
          trackIndex = i;
        }
      }
      playlist.tracks.splice(trackIndex, 1);
      playlist.save(function (err) {
         if(err) { reject(err); }
         return true;
      });
    })
  })
}

DAL.prototype.newPlaylist = function() {
  return new Promise((resolve, reject) => {
    const pl = new Playlist({ title: "", tracks: []});

    pl.save(err => {
      if (err) { reject(err); }
      else {
        console.log("DAL", pl)
        resolve(pl);
      }
    })
  })
};

module.exports = new DAL();
