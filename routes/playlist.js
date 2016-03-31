const express = require('express');
const router = express.Router();
const Promise = require("bluebird");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://sonny:123@ds037165.mlab.com:37165/playlist")

const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  title: String,
  tracks: Array
});

const Playlist = mongoose.model("PlaylistSchema", PlaylistSchema);

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {
  getPlaylist()
  .then(json => {
    res.json(json);
  })
});

router.post("/", (req, res) => {
  console.log(req.body);
  const playlistId = req.body.playlistId;
  return new Promise((resolve, reject) => {
    Playlist.findById(playlistId, (err, playlist) => {
      if (err) { reject(err); }
      playlist.tracks.push(req.body.track);
      playlist.save(err => {
        if (err) { reject(err); }
        else {
          res.send("succeeded");
        }
      })
    })
  });
})

router.post("/:id/delete/:track", (req, res) => {
  const playlistId = req.params.id;
  const track = req.params.track;

  // console.log("track",track);

  new Promise((resolve, reject) => {
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
         res.send("deleted");
      });
    })
  })
  .catch((err) => {
    console.log("error");
  })
  .then(() => {
    res.send(`dios mio!!`);    
  })
});

function getPlaylist() {
  return new Promise((resolve, reject) => {
    Playlist.find({_id: "56e972b23f5229f01a57b7a8"}, (err, json) => {
      if (err) { reject(err); }
      resolve(json);
    });
  });
};


module.exports = router;
