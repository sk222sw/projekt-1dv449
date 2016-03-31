const express = require('express');
const router = express.Router();
const DAL = require("./../models/DAL");

const _ = require("lodash");



router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {
  DAL.getPlaylist()
  .then(json => {
    res.json(json);
  })
});

router.post("/", (req, res) => {
  DAL.addTrack(req.body.playlistId, req.body.track)
  .then(r => {
    if (r) {
      res.send("succeeded");
    }
  })
  .catch(err => {
    console.log(err.message);
    res.send("Sorry, there was an error adding the track to the database");
  })
})

router.post("/:id/delete/:track", (req, res) => {
  const playlistId = req.params.id;
  const track = req.params.track;

  DAL.deleteTrack(req.params.id, req.params.track)
  .then(r => {
    if (r) {
      res.send(`dios mio!!`);
    }
  })

});




module.exports = router;
