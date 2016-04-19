import React from "react";
import uuid from "node-uuid";

import TrackList from "./TrackList";
import PlaylistStore from "./stores/PlaylistStore";
import * as PlaylistActions from "./actions/PlaylistActions";
import Player from "./components/Player";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlaylistStore.getState();

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

  updateState = () => {
    this.setState(PlaylistStore.getState());
  }

  // CRUDE : : : : : : : : : : : :

  getTracks = () => {
    this.setState({
      tracks: PlaylistStore.getTracks(),
    });
    if (this.state.firstTrack) {
      this.state.firstTrack = false;
      PlaylistActions.getFirstTrack(this.state.tracks[0].url);
    }
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

  // används inte?
  getCurrentTrackIndex = () => {
    console.log("index", this.state.currentTrackIndex);
    return this.state.tracks[this.state.currentTrackIndex];
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
    this.setState({
      currentTrackIndex: PlaylistStore.getTrackIndex()
    });
    PlaylistActions.nextTrack(this.state.tracks[this.state.currentTrackIndex].url);
  }

 // STUFF : : : : : : : :

  validateUrl = (urlString) => {
    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlRegex.test(urlString.toLowerCase());
  }

  // RENDER AREA : : : : : : : :

  render() {
    const tracks = this.state.tracks;
    return (
      <div>
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
