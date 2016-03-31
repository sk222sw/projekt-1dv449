const express = require('express');
const router = express.Router();
const Promise = require("bluebird");
const mongoose = require("mongoose");

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
  getPlaylists()
  .then(json => {
    res.json(json);
  })
});

router.post("/", (req, res) => {
  const id = req.body.id;
  return new Promise((resolve, reject) => {
    Playlist.findById(id, (err, playlist) => {
      if (err) { reject(err); }
      const track = {
          "type": "",
          "title": req.body.title,
          "number": 0,
          "uri": "",
          "user": {},
          "artist": ""
      };
      playlist.tracks.push(track);
      playlist.save(err => {
        if (err) { reject(err); }
        else {
          res.send("succeeded");
        }
      })
    })
  });
})

function getPlaylists() {
  return new Promise((resolve, reject) => {
    Playlist.find({_id: "56e972b23f5229f01a57b7a8"}, (err, json) => {
      if (err) { reject(err); }
      resolve(json);
    });
  });
};


module.exports = router;
