const express = require('express');
const apiHandler = express.Router();
const DAL = require("./../models/DAL");
const _ = require("lodash");

apiHandler.get("/", (req, res) => {
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
  });
});

apiHandler.post("/", (req, res) => {
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

apiHandler.post("/getSimilarArtists", (req, res) => {
  DAL.getSpotifyInfo(req.body.userName)
  .then(json => json.artists.items[0].id)
  .then(DAL.getSimilarArtists)
  .then(artists => {
    res.send(artists);
  })
  .catch(err => {
    res.send(err, 404);
  });
});

apiHandler.post("/getArtistInfo", (req, res) => {
  console.log(req.body.userName);
  DAL.getDiscogsInfo(req.body.userName)
  .then(DAL.getArtistInfo)
  .then(response => {
    res.send(response);
  })
  // .catch(err => {
  //   console.log("*****************", err);
  // })
});

module.exports = apiHandler;
