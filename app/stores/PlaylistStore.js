import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import _ from "lodash";

class PlaylistStore extends EventEmitter {
  constructor() {
    super();

    this.state = {
      tracks: [],
      id: "",
      playingTrack: {
        number: 0,
        uri: ""
      },
      nextTrackNumber: 0,
      currentTrackUri: "",
      firstTrack: true
    };
  }

  getState = () => this.state;

  createPlaylist = (id) => {
    this.state.id = id;
    this.emit("change");
  }

  getId() {
    return this.state.id;
  }

  fetchPlaylist() {
    // TODO show a loader or something?
  }

  getTracks = () => {
    return this.state.tracks;
  }

  receievePlaylist = (playlist) => {
    this.state.tracks = playlist.tracks;
    this.emit("change");
  }

  createTrack = (track) => {
    this.state.tracks.push(track);
    this.emit("change");
  }

  deleteTrack = (id) => {
    this.state.tracks = _.filter(this.getTracks(), track => track.id !== id);
    this.emit("change");
  }

  getCurrentTrackUri = () => {
    return this.state.currentTrackUri;
  }

  getNextTrackNumber = () => {
    return this.state.nextTrackNumber;
  }

  nextTrack = (track) => {
    this.state.currentTrackUri = track.uri;
    if (this.state.nextTrackNumber >= this.state.tracks.length - 1) {
      this.state.nextTrackNumber = 0;
    } else {
      this.state.nextTrackNumber++;
    }
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
        this.nextTrack(action.track);
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
