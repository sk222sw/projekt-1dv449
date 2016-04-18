import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import _ from "lodash";

class PlaylistStore extends EventEmitter {
  constructor() {
    super();

    this.playlist = {
      tracks: [],
      id: ""
    };

    this.trackNumber = 1;
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
    this.playlist = playlist;
    this.emit("change");
  }

  createTrack = (track) => {
    this.playlist.tracks.push(track);
    this.emit("change");
  }

  deleteTrack = (id) => {
    this.playlist.tracks = _.filter(this.getTracks(), track => track.id !== id);
    this.emit("change");
  }

  getTrackNumber = () => {
    return this.trackNumber;
  }

  nextTrack = () => {
    this.trackNumber++;
    this.emit("next-track");
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
      case "CREATE_TRACK":
        this.createTrack(action.track);
        break;
      case "DELETE_TRACK":
        this.deleteTrack(action.id);
        break;
      case "NEXT_TRACK":
        this.nextTrack();
        break;
      case "DISPLAY_LOADER":
        // TODO display loader
        break;
      case "ERROR_HANDLER":
        // TODO create error handling action
      default:
      // TODO figure out something default?
    }
  }
}

const playlistStore = new PlaylistStore;
dispatcher.register(playlistStore.handleActions.bind(playlistStore));

export default playlistStore;
