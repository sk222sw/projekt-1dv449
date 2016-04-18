const express = require('express');
const router = express.Router();
const DAL = require("./../models/DAL");

router.get("/", (req, res) => {
  DAL.getSoundCloudData("url")
  .then(json => {
    const soundCloudTrack = {
      type: "SoundCloud",
      title: json.title,
      uri: json.uri,
      user: {
        id: json.user.id,
        userName: json.user.username
      }
    };
    return soundCloudTrack;
  })
  .then(track => {
    res.json(track);
  })
});

router.post("/", (req, res) => {
  console.log(req.body.url);
  DAL.getSoundCloudData(req.body.url)
  .then(json => {
    const soundCloudTrack = {
      type: "SoundCloud",
      title: json.title,
      uri: json.uri,
      user: {
        id: json.user.id,
        userName: json.user.username
      }
    };
    return soundCloudTrack;
  })
  .then(track => {
    res.json(track);
  });
});

module.exports = router;
