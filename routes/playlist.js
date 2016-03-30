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

function getPlaylists() {
  return new Promise((resolve, reject) => {
    Playlist.find({_id: "56e972b23f5229f01a57b7a8"}, (err, json) => {
      if (err) { reject(err); }
      resolve(json);
    });
  });
};


module.exports = router;
