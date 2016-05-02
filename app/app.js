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

  createTrack() {
    const newTrack = {
      url: this.refs.newTrack.value,
      title: "",
      id: uuid.v4()
    };
    PlaylistActions.createTrack(newTrack, this.props.params.playlist);
  }

  pickTrack = (url) => {
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

  getSimilarArtists = () => {
    // if (this.state.similarArtists.length === 0) {
    PlaylistActions.getSimilarArtists(this.state.playingTrack.userName);
    // }
  }

  renderSimilarArtists = () => {
    return (
      <ul>
        {
          this.state.similarArtists.map(artist =>
            <li key={uuid.v4()}>
              {artist.name}
            </li>
          )
        }
      </ul>
    );
  }

  getArtistInfo = () => {
    PlaylistActions.getArtistInfo(this.state.playingTrack.userName);
  }

  renderArtistInfo = () => {
    return (
      <div>
        {this.state.artistInfo}
      </div>
    );
  }

  hideError = () => {
    PlaylistActions.hideError();
  }

  renderErrorMessage = () => {
    return (
      <div>
        <div className="error" onClick={this.hideError}>
          {this.state.errorMessage}
          <div className="close">close</div>
        </div>
      </div>
    );
  }

  // RENDER AREA : : : : : : : :
  render() {
    const tracks = this.state.tracks;
    return (
      <div className="pure-g">
        <div className="pure-u-1-3 track-list">
          <div className="new-track">
            <div>
              <input ref="newTrack" />
            </div>
            <div>
              <button className="pure-button pure-button-primary"
                onClick={this.createTrack.bind(this)}>&darr;</button>
            </div>
          </div>
          <TrackList tracks={tracks}
            onDelete={this.deleteTrack}
            pickTrack={this.pickTrack}
          />
        </div>
        <div className="pure-u-1-3">
          <div className="error-area">
            {
              this.state.errorMessage !== "" ? this.renderErrorMessage()
                : null
            }
          </div>
          <div>
            <button onClick={this.getNextTrack}>Play/Next</button>
          </div>
          <Player
            track={this.state.currentTrackUri}
            playingTrack={this.state.playingTrack}
            similarArtists={this.getSimilarArtists}
            getArtistInfo={this.getArtistInfo}
            nextTrack={this.getNextTrack}
            nextTrackInfo={PlaylistStore.getNextTrackInfo()}
          />
          <div className="artist-info">
            {
              this.state.artistInfo === "" ?
                null : this.renderArtistInfo()
            }
          </div>
        </div>
        <div className="pure-u-1-3 similar-artists-picture pure-img">
          <div className="similar-artists" onClick={this.getSimilarArtists} >
            {
              this.state.similarArtists.length === 0 ?
                null : this.renderSimilarArtists()
            }
          </div>
        </div>
      </div>
    );
  }
}
