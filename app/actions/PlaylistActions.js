import dispatcher from "../dispatcher";

export function fetchPlaylist(id) {
  dispatcher.dispatch({
    type: "FETCH_PLAYLIST",
    id
  });
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
