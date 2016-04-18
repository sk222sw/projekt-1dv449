import dispatcher from "../dispatcher";
import axios from "axios";

export function createTrack(track, playlistId) {
  axios.post("/playlist",
    {
      track,
      playlistId
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      dispatcher.dispatch({
        type: "CREATE_TRACK",
        track
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export function deleteTrack(id) {
  dispatcher.dispatch({
    type: "DELETE_TRACK",
    id
  });
}

export function reloadTracks() {
  dispatcher.dispatch({ type: "FETCH_TRACKS" });
  fetch("./playlist/570112cb47f082281c03984a")
  .then(data => data.json())
  .then(data => {
    dispatcher.dispatch({ type: "RECEIVE_TRACKS", playlist: data });
  })
  .catch(err => {
    console.log(err);
  });
}
