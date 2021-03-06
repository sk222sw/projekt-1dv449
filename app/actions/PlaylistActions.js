import dispatcher from "../dispatcher";
import axios from "axios";

export function fetchPlaylist(id) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.get(`./playlist/${id}`)
  .then(playlist => {
    return playlist.data[0];
  })
  .then(json => {
    const playlist = json;
    dispatcher.dispatch({ type: "RECEIVE_PLAYLIST", playlist });
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
  })
  .catch(err => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
  });
}

export function createPlaylist() {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.get("./playlist/new")
    .then(playlist => playlist.data)
    .then(playlist => {
      dispatcher.dispatch({ type: "REMOVE_LOADER" });
      dispatcher.dispatch({
        type: "CREATE_PLAYLIST",
        id: playlist._id
      });
    })
    .catch(err => {
      console.log(err);
      dispatcher.dispatch({ type: "REMOVE_LOADER" });
    });
}

export function createTrack(track, playlistId) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.post("/playlist", {
    track,
    playlistId
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
    dispatcher.dispatch({
      type: "CREATE_TRACK",
      track
    });
  })
  .catch(err => {
    if (err.status === 400) {
      const message = `Soundcloud couldn't find a track with that URL.
                       Are your sure it's correctly spelled?`;
      dispatcher.dispatch({
        type: "SET_ERROR",
        message
      });
    }
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
  });
}

export function getTitle(url) {
  axios.post("/apiHandler", {
    url
  })
  .then(response => {
    dispatcher.dispatch({
      type: "GET_TITLE",
      track: response.data
    });
  });
}

export function nextTrack(url) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.post("/apiHandler", {
    url
  })
  .then(response => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
    dispatcher.dispatch({
      type: "NEXT_TRACK",
      track: response.data
    });
  });
}

export function previousTrack(url) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.post("/apiHandler", {
    url
  })
  .then(response => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
    dispatcher.dispatch({
      type: "PREVIOUS_TRACK",
      track: response.data
    });
  });
}

export function getSimilarArtists(userName) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.post("/apiHandler/getSimilarArtists", {
    userName
  })
  .then(artists => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
    dispatcher.dispatch({
      type: "GET_SIMILAR_ARTISTS",
      artists
    });
  })
  .catch(err => {
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
    dispatcher.dispatch({
      type: "GET_SIMILAR_ARTISTS",
      err
    });
  });
}

export function hideError() {
  dispatcher.dispatch({
    type: "HIDE_ERROR"
  });
}

export function setError(message) {
  dispatcher.dispatch({
    type: "SET_ERROR",
    message
  });
}

export function getArtistInfo(userName) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  axios.post("/apiHandler/getArtistInfo", {
    userName
  })
  .then(artistInfo => {
    console.log("info", artistInfo);
    dispatcher.dispatch({
      type: "GET_ARTIST_INFO",
      artistInfo
    });
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
  })
  .catch(err => {});
}

export function getNextTrackInfo(url) {
  axios.post("/apiHandler", {
    url
  })
  .then(response => {
    dispatcher.dispatch({
      type: "GET_NEXT_TRACK_INFO",
      track: response.data
    });
    return response;
  });
}

export function deleteTrack(playlistId, trackId) {
  dispatcher.dispatch({ type: "SHOW_LOADER" });
  const url = `/playlist/${playlistId}/delete/${trackId}`;

  axios.post(url, {})
  .then(() => {
    dispatcher.dispatch({ type: "DELETE_TRACK", id: trackId });
    dispatcher.dispatch({ type: "REMOVE_LOADER" });
  });
}
