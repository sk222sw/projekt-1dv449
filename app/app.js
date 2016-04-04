import React from "react";
import uuid from "node-uuid";

import TrackList from "./TrackList";
import TrackStore from "./stores/TrackStore";
import PlaylistStore from "./stores/PlaylistStore";
import * as TrackActions from "./actions/TrackActions";
import * as PlaylistActions from "./actions/PlaylistActions";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], displayFlash: false, flashMessage: "" };

    if (this.props.params.playlist) {
      PlaylistActions.fetchPlaylist(this.props.params.playlist);
    }
  }

  componentWillMount() {
    TrackStore.on("change", this.getTracks);
    PlaylistStore.on("change", this.getTracks);
  }

  componentWillUnmount() {
    TrackStore.removeListener("change", this.getTracks);
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

  deleteTrack = (id, e) => {
    e.stopPropagation();
    const playlistId = this.props.params.playlist;
    const http = new XMLHttpRequest();
    const url = `/playlist/${playlistId}/delete/${id}`;
    const params = `id=${playlistId}&title=${id}`;

    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      console.log("http.status");
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);
      }
    };
    http.send(params);

    this.setState({
      tracks: this.state.tracks.filter(track => track.id !== id),
      displayFlash: true,
      flashMessage: "Deleted track"
    });
  }

  fetchPlaylist = () => {
    PlaylistActions.fetchPlaylist(this.props.params.playlist);
  }

  createTrack() {
    const newTrack = {
      url: this.refs.newTrack.value,
      title: "",
      id: uuid.v4()
    }
    // TrackActions.createTrack(newTrack, this.props.params.playlist);
    PlaylistActions.createTrack(newTrack, this.props.params.playlist);
  }

  reloadTracks() {
    TrackActions.reloadTracks();
  }

  fetchTracks() {
    TrackActions.fetchTracks();
  }

  render() {
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
        <button onClick={this.reloadTracks.bind(this)}>RELOAD</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
