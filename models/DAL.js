const Promise = require("bluebird");
const mongoose = require("mongoose");
const request = require("request");

mongoose.connect("mongodb://sonny:123@ds037165.mlab.com:37165/playlist")

const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  title: String,
  tracks: Array
});

const Playlist = mongoose.model("PlaylistSchema", PlaylistSchema);

const DAL = function () {};

DAL.prototype.getPlaylist = function (_id) {
  return new Promise((resolve, reject) => {
    Playlist.find({ _id }, (err, json) => {
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
      playlist.save(err => {
         if(err) { reject(err); }
         resolve(true);
      });
    });
  });
};

DAL.prototype.newPlaylist = function () {
  return new Promise((resolve, reject) => {
    const pl = new Playlist({ title: "", tracks: []});

    pl.save(err => {
      if (err) {
        reject(err);
      } else {
        resolve(pl);
      }
    });
  });
};

DAL.prototype.getSoundCloudData = function (url) {
  const apiString = "https://api.soundcloud.com/resolve.json?url=" + url + "&client_id=defe1307335b6141da3b5c880c33bbab";
  return new Promise((resolve, reject) => {
    request(apiString, (err, res, rawJson) => {
      if (err) { reject(err); }
      const json = JSON.parse(rawJson);
      resolve(json);
    });
  });
};

DAL.prototype.getDiscogsInfo = function (artist) {
  const options = {
    url: "https://api.discogs.com/database/search?q=" + artist + "&key=krHhCJCFIowVZukzsdqK&secret=DOWuJnVGdcpwInntlOJJLzoNwdTZIoRS",
    headers: {
      'User-Agent': 'Plurlist/0.1 +sonnykjellberg@gmail.com'
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, rawJson) => {
      if (err) { reject(err); }
      const jsonData = JSON.parse(rawJson);
      resolve(jsonData.results[0].resource_url);
    });
  });
};

DAL.prototype.getArtistInfo = function (discogsUrl) {
  const options = {
    url: discogsUrl,
    headers: {
      'User-Agent': 'Plurlist/0.1 +sonnykjellberg@gmail.com'
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, rawJson) => {
      if (err) { reject(err); }
      const jsonData = JSON.parse(rawJson);
      resolve(jsonData);
    });
  });
};

DAL.prototype.getSpotifyInfo = function (name) {
  const encodedName = encodeURIComponent(name);
  return new Promise((resolve, reject) => {
    request("https://api.spotify.com/v1/search?q=" + encodedName + "&type=artist", (err, res, rawJson) => {
      if (err) { reject(err); }
      const jsonData = JSON.parse(rawJson);
      resolve(jsonData);
    });
  });
};

DAL.prototype.getSimilarArtists = function (artistId) {
  console.log("HHHHHHHHHH***************************");
  const url = "https://api.spotify.com/v1/artists/" + artistId + "/related-artists";
  return new Promise((resolve, reject) => {
    request(url, (err, res, rawJson) => {
      if (err) { reject(err); }
      const jsonData = JSON.parse(rawJson);
      resolve(jsonData.artists);
    });
  });
};

module.exports = new DAL();
