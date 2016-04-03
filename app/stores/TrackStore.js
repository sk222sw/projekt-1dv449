import { EventEmitter } from "events";
import uuid from "node-uuid";

import dispatcher from "../dispatcher";

class TrackStore extends EventEmitter {
  constructor() {
    super();
    this.tracks = [
      {
        id: uuid.v4(),
        title: "hsfsdfej",
      },
      {
        id: uuid.v4(),
        title: "hesssj",
      },
      {
        id: uuid.v4(),
        title: "hejfff",
      }
    ];
  }

  createTrack(title) {
    this.tracks.push({
      title,
      id: uuid.v4()
    })

    this.emit("change");
  }

  getAll() {
    return this.tracks;
  }

  receiveTracks() {
    return this.tracks;
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_TRACK":
        this.createTrack(action.text);
        break;
      case "RECEIVE_TRACKS":
        console.log(action.playlist);
        this.receiveTracks();
        this.emit("change");
        break;
      case "FETCH_TRACKS":
        console.log("fetching tracks. display loader!");
        break;
      default:

    }
    console.log("TrackStore recieved an action", action)
  }

}


const trackStore = new TrackStore;
dispatcher.register(trackStore.handleActions.bind(trackStore));

export default trackStore;
