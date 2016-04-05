import dispatcher from "../dispatcher";
import axios from "axios";

export function fetchPlaylist(id) {
  fetch(`./playlist/${id}`)
  .then(playlist => playlist.json())
  .then(json => {
    const playlist = json[0];
    dispatcher.dispatch({ type: "RECEIVE_PLAYLIST", playlist });
  })
  .catch(err => {
    console.log(err);
  });
}

export function createPlaylist() {
  fetch("./playlist/new")
  .then(playlist => playlist.json())
  .then(playlist => {
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

export function soundCloudApi(trackUrl) {
  dispatcher.dispatch({
    type: "SOUNDCLOUD_API",
    trackUrl
  });
}

export function deleteTrack(playlistId, trackId) {
  const url = `/playlist/${playlistId}/delete/${trackId}`;

  axios.post(url, {})
  .then(() => {
    dispatcher.dispatch({ type: "DELETE_TRACK", id: trackId });
  });
}
