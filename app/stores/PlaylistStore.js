import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PlaylistStore extends EventEmitter {
  constructor() {
    super();

    this.playlist = {
      id: ""
    };
  }

  createPlaylist = (id) => {
    this.playlist.id = id;
    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_PLAYLIST":
        this.createPlaylist(action.id);
        break;
      default:
    }
  }

  getId() {
    return this.playlist.id;
  }

}

const playlistStore = new PlaylistStore;
dispatcher.register(playlistStore.handleActions.bind(playlistStore));

export default playlistStore;
