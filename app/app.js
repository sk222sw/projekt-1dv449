import React from "react";
import uuid from "node-uuid";

import TrackList from "./TrackList";
import PlaylistStore from "./stores/PlaylistStore";
import * as PlaylistActions from "./actions/PlaylistActions";
import Player from "./components/Player";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [],
      displayFlash: false,
      flashMessage: "",
      currentTrack: 1,
      currentTrackUri: ""
    };

    if (this.props.params.playlist) {
      PlaylistActions.fetchPlaylist(this.props.params.playlist);
    }
  }

  componentWillMount() {
    PlaylistStore.on("change", this.getTracks);
    PlaylistStore.on("next-track", this.setNextTrack);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("change", this.getTracks);
    PlaylistStore.removeListener("next-track", this.setNextTrack);
  }

  // CRUDE : : : : : : : : : : : :

  getTracks = () => {
    this.setState({
      tracks: PlaylistStore.getTracks()
    });
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


  // track things : : : : : : : :

  getCurrentTrack = () => {
    return this.state.tracks[this.state.currentTrack];
  }

  pickTrack = (apiUrl) => {
    PlaylistActions.soundCloudApi(apiUrl);
  }

  setNextTrack = () => {
    this.setState({
      currentTrackUri: PlaylistStore.getCurrentTrackUri()
    });
  }

  getNextTrack = () => {
    PlaylistActions.nextTrack(this.getCurrentTrack().url);
  }

 // STUFF _:  _ : :: : ::: : ::

  validateUrl = (urlString) => {
    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlRegex.test(urlString.toLowerCase());
  }

  // RENDER AREA :: : : : : : : ::

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
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
          pickTrack={this.pickTrack}
        />
      <div>
        <button onClick={this.getNextTrack}>Next</button>
      </div>
      <Player track={this.state.currentTrackUri} />
      </div>
    );
  }
}
