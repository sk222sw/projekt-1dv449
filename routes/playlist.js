const express = require('express');
const router = express.Router();
const DAL = require("./../models/DAL");

router.get('/', (req, res) => {

});

router.get("/new", (req, res) => {
  DAL.newPlaylist()
  .then(result => {
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  DAL.getPlaylist(req.params.id)
  .then(json => {
    res.json(json);
  });
});

router.post("/", (req, res) => {
  const regexp = /((https:\/\/)|(http:\/\/)|(www.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/;
  if (req.body.track.url.match(regexp) && req.body.track.url.match(regexp)[2]) {
    console.log("yep!!");
    DAL.addTrack(req.body.playlistId, req.body.track)
    .then(r => {
      if (r) {
        res.send(200);
      } else {
        res.send(500);
      }
    })
    .catch(err => {
      console.log(err.message);
      res.send("Sorry, there was an error adding the track to the database");
    });
  } else {
    console.log("nope!");
    res.send(400, "The URL does not seem to be valid. Make sure it has the following format: https://soundcloud.com/[artist]/[track]");
  }
});

router.post("/:id/delete/:track", (req, res) => {
  DAL.deleteTrack(req.params.id, req.params.track)
  .then(r => {
    if (r) {
      res.send(200);
    }
  })
  .catch(err => {
    console.log(err.message);
    res.send("Sorry, there was an error", 500);
  });
});

module.exports = router;
