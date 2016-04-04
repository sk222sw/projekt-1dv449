import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PlaylistStore extends EventEmitter {
  constructor() {
    super();

    this.playlist = {
      id: "",
      tracks: []
    };
  }

  createPlaylist = (id) => {
    this.playlist.id = id;
    this.emit("change");
  }

  getId() {
    return this.playlist.id;
  }

  fetchPlaylist() {
    // TODO show a loader or something?
  }

  getTracks = () => {
    return this.playlist.tracks;
  }

  receievePlaylist = (playlist) => {
    console.log("receieve playlist with tracks: ", playlist.tracks);
    this.playlist = playlist;
    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_PLAYLIST":
        this.createPlaylist(action.id);
        break;
      case "FETCH_PLAYLIST":
        this.fetchPlaylist(action.id);
        break;
      case "RECEIVE_PLAYLIST":
        this.receievePlaylist(action.playlist);
        break;
      default:
    }
  }

}

const playlistStore = new PlaylistStore;
dispatcher.register(playlistStore.handleActions.bind(playlistStore));

export default playlistStore;
