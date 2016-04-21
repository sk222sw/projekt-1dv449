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
        user: {}
      },
      currentTrackNumber: 0,
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

  getcurrentTrackNumber = () => {
    return this.state.currentTrackNumber;
  }

  nextTrack = (track) => {
    console.log(track);
    this.state.playingTrack = {
      title: track.title,
      userName: track.user.userName,
      url: track.uri
    };
    console.log(this.state.playingTrack);
    this.state.currentTrackUri = track.uri;

    if (this.state.currentTrackNumber >= this.state.tracks.length - 1) {
      this.state.currentTrackNumber = 0;
    } else {
      this.state.currentTrackNumber++;
    }

    this.emit("next-track");
    this.emit("change");
  }

  getTitle = track => {
    console.log("getTitle", track.title);
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
      case "GET_TITLE":
        this.getTitle(action.track);
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
