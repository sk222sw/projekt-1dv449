import dispatcher from "../dispatcher";
import axios from "axios";

export function fetchPlaylist(id) {
  axios.get(`./playlist/${id}`)
  .then(playlist => {
    return playlist.data[0];
  })
  .then(json => {
    console.log(json.tracks);
    const playlist = json;
    dispatcher.dispatch({ type: "RECEIVE_PLAYLIST", playlist });
  })
  .catch(err => {
    console.log(err);
  });
}

export function createPlaylist() {
  axios.get("./playlist/new")
  .then(playlist => playlist.data)
  .then(playlist => {
    console.log("playlist", playlist)
    dispatcher.dispatch({
      type: "CREATE_PLAYLIST",
      id: playlist._id
    });
  });
}

export function createTrack(track, playlistId) {
  axios.post("/playlist", {
    track,
    playlistId
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    dispatcher.dispatch({
      type: "CREATE_TRACK",
      track
    });
  })
  .catch(err => {
    console.log(err);
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
  axios.post("/apiHandler", {
    url
  })
  .then(response => {
    dispatcher.dispatch({
      type: "NEXT_TRACK",
      track: response.data
    });
  });
}

export function deleteTrack(playlistId, trackId) {
  const url = `/playlist/${playlistId}/delete/${trackId}`;

  axios.post(url, {})
  .then(() => {
    dispatcher.dispatch({ type: "DELETE_TRACK", id: trackId });
  });
}
