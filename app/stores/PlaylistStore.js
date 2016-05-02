import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import _ from "lodash";

class PlaylistStore extends EventEmitter {
  constructor() {
    super();

    this.state = {
      playlistId: "",
      showCreateButton: true,
      tracks: [],
      id: "",
      playingTrack: {
        user: {}
      },
      currentTrackNumber: 0,
      previousTrackNumber: 0,
      currentTrackUri: "",
      firstTrack: true,
      similarArtists: [],
      errorMessage: "",
      artistInfo: "",
      loader: false,
      nextSoundCloudUrl: "no url yet"
    };
  }

  getState = () => this.state;

  getNextSoundCloudUrl = () => this.state.nextSoundCloudUrl;

  createPlaylist = (id) => {
    this.state.playlistId = id;
    this.state.showCreateButton = false;
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
    this.state.playingTrack = {
      title: track.title,
      userName: track.user.userName,
      url: track.uri
    };
    this.state.currentTrackUri = track.uri;

    if (this.state.currentTrackNumber >= this.state.tracks.length - 1) {
      this.state.currentTrackNumber = 0;
    } else {
      this.state.currentTrackNumber++;
    }

    this.emit("next-track");
    this.emit("change");
  }

  previousTrack = track => {
    this.state.playingTrack = {
      title: track.title,
      userName: track.user.userName,
      url: track.uri
    };
    this.state.currentTrackUri = track.uri;

    if (this.state.currentTrackNumber >= this.state.tracks.length - 1) {
      this.state.currentTrackNumber = 0;
    } else {
      this.state.currentTrackNumber++;
    }

    this.emit("next-track");
    this.emit("change");
  }

  getSimilarArtists = response => {
    if (response.err || response.data.length === 0) {
      this.state.errorMessage = "Sorry, no similar artists could be found";
    } else {
      this.state.similarArtists = response.artists;
    }
    this.emit("change");
  }

  getArtistInfo = info => {
    if (info == "undefined" || info == null || info === "") {
      this.state.errorMessage = "Sorry, no artist info could be found.";
    } else {
      this.state.artistInfo = info;
    }
    this.emit("change");
  }

  showLoader = () => {
    this.state.loader = true;
    this.emit("change");
  }

  removeLoader = () => {
    this.state.loader = false;
    this.emit("change");
  }

  hideError = () => {
    this.state.errorMessage = "";
    this.emit("change");
  }

  getNextTrackInfo = (track) => {
    return this.state.currentTrackNumber >= this.state.tracks.length
      ? this.state.tracks[0]
      : this.state.tracks[this.state.currentTrackNumber];
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
      case "PREVIOUS_TRACK":
        this.previousTrack(action.track);
        break;
      case "GET_TITLE":
        this.getTitle(action.track);
        break;
      case "GET_SIMILAR_ARTISTS":
        this.getSimilarArtists(action);
        break;
      case "GET_ARTIST_INFO":
        this.getArtistInfo(action.artistInfo.data.profile);
        break;
      case "SHOW_LOADER":
        this.showLoader();
        break;
      case "REMOVE_LOADER":
        this.removeLoader();
        break;
      case "HIDE_ERROR":
        this.hideError();
        break;
      case "GET_NEXT_TRACK_INFO":
        this.getNextTrackInfo(action.track);
        break;
      default:
        break;
    }
  }
}

const playlistStore = new PlaylistStore;
dispatcher.register(playlistStore.handleActions.bind(playlistStore));

export default playlistStore;
