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
    PlaylistStore.on("next-track", this.setTrack);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("change", this.getTracks);
    PlaylistStore.removeListener("next-track", this.setTrack);
  }

  updateState = () => {
    this.setState(PlaylistStore.getState());
  }

  getTracks = () => {
    this.updateState();

    this.setState({
      tracks: PlaylistStore.getTracks(),
    });
  }

  deleteTrack = (trackId) => {
    const playlistId = this.props.params.playlist;
    PlaylistActions.deleteTrack(playlistId, trackId);
  }

  updateTrack = trackId => {
    console.log(trackId);
  }

  createTrack() {
    const newTrack = {
      url: this.refs.newTrack.value,
      title: "",
      id: uuid.v4()
    };
    PlaylistActions.createTrack(newTrack, this.props.params.playlist);
  }

  pickTrack = (url) => {
    console.log(url);
    return PlaylistActions.getTitle(url);
  }

  setTrack = () => {
    this.setState({
      currentTrackUri: PlaylistStore.getCurrentTrackUri(),
    });
  }

  getNextTrack = () => {
    this.updateState();
    PlaylistActions.nextTrack(this.state.tracks[this.state.currentTrackNumber].url);
  }

  listState = () => {

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
          updateTrack={this.updateTrack}
        />
      <div>
        <button onClick={this.getNextTrack}>Play/Next</button>
      </div>
      <Player track={this.state.currentTrackUri} playingTrack={this.state.playingTrack} />
      </div>
    );
  }
}
