import React from "react";
import uuid from "node-uuid";

import TrackList from "./TrackList";
import PlaylistStore from "./stores/PlaylistStore";
import * as PlaylistActions from "./actions/PlaylistActions";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [],
      displayFlash: false,
      flashMessage: ""
    };

    if (this.props.params.playlist) {
      PlaylistActions.fetchPlaylist(this.props.params.playlist);
    }
  }

  componentWillMount() {
    PlaylistStore.on("change", this.getTracks);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("change", this.getTracks);
  }

  getTracks = () => {
    this.setState({
      tracks: PlaylistStore.getTracks()
    });
  }

  validateUrl = (urlString) => {
    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlRegex.test(urlString.toLowerCase());
  }

  deleteTrack = (trackId) => {
    const playlistId = this.props.params.playlist;
    PlaylistActions.deleteTrack(playlistId, trackId);
  }

  createTrack() {
    const newTrack = {
      url: this.refs.newTrack.value,
      title: "",
      id: uuid.v4()
    };
    PlaylistActions.createTrack(newTrack, this.props.params.playlist);
  }

  render() {
    console.log("render");
    const tracks = this.state.tracks;
    return (
      <div>
        {
          this.state.displayFlash ?
            <p>{this.state.flashMessage}</p> :
            null
        }
        <input ref="newTrack" />
        <button onClick={this.createTrack.bind(this)}>&#8594;</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
