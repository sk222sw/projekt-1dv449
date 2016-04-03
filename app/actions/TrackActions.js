import dispatcher from "../dispatcher";

export function createTrack(text) {
  dispatcher.dispatch({
    type: "CREATE_TRACK",
    text
  })
}

export function deleteTrack(id) {
  dispatcher.dispatch({
    type: "DELETE_TRACK",
    id
  })
}

export function reloadTracks() {
  dispatcher.dispatch({type: "FETCH_TRACKS"});
  fetch("./playlist/570112cb47f082281c03984a")
  .then(data => data.json())
  .then(data => {
    console.log(data)
    console.log("got some data");
    dispatcher.dispatch({type: "RECEIVE_TRACKS", playlist: data});
  })
  .catch(err => {
    console.log(err);
  })
}
