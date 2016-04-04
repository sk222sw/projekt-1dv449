import { EventEmitter } from "events";
import uuid from "node-uuid";

import dispatcher from "../dispatcher";

class TrackStore extends EventEmitter {
  constructor() {
    super();
    this.tracks = [

    ];
  }

  fetchTracks() {

  }

  createTrack(track) {
    this.tracks.push(track);
    this.emit("change");
  }

  getAll() {
    return this.tracks;
  }

  receiveTracks(tracks) {
    console.log(tracks);
    this.tracks.push({
      title: "HEJSAN CYKA",
      id: uuid.v4()
    });
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_TRACK":
        this.createTrack(action.track);
        break;
      case "RECEIVE_TRACKS":
        this.receiveTracks(action.playlist);
        this.emit("change");
        break;
      case "FETCH_TRACKS":
        this.fetchTracks();
        break;
      default:

    }
  }

}


const trackStore = new TrackStore;
dispatcher.register(trackStore.handleActions.bind(trackStore));

export default trackStore;
