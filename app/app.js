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
    if (this.validateSoundCloudUrl(this.refs.newTrack.value)) {
      console.log("should fucking validate, k");
      PlaylistActions.createTrack(newTrack, this.props.params.playlist);
    } else {
      PlaylistActions.setError(`The URL does not seem to be valid. Make sure it
        has the following format: https://soundcloud.com/[artist]/[track]`);
    }
    this.refs.newTrack.value = "";
  }

  validateSoundCloudUrl(inputUrl) {
    const regexp = /((https:\/\/)|(http:\/\/)|(www.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/;
    return inputUrl.match(regexp) && inputUrl.match(regexp)[2];
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


  getPreviousTrack = () => {
    this.updateState();
    let current = this.state.currentTrackNumber - 1;
    let previousTrackNumber = 0;
    if (current < 0) {
      current = this.state.tracks.length - 1;
    }

    if (current <= 0) {
      previousTrackNumber = this.state.tracks.length - 1;
    } else {
      previousTrackNumber = current - 1;
    }

    PlaylistActions.previousTrack(this.state.tracks[previousTrackNumber].url);
  }

  listState = () => {

  }

  getSimilarArtists = () => {
    PlaylistActions.getSimilarArtists(this.state.playingTrack.userName);
  }

  renderSimilarArtists = () => {
    return (
      <div className="artist-info animated bounceInRight">
          {
            this.state.similarArtists.map(artist =>
              <div key={uuid.v4()}>
                {artist.name}
              </div>
            )
          }
          <div className="powered-by">
            powered by
            <a href="https://www.spotify.com" target="_blank"> spotify</a>
          </div>
      </div>
    );
  }

  getArtistInfo = () => {
    PlaylistActions.getArtistInfo(this.state.playingTrack.userName);
  }

  renderArtistInfo = () => {
    return (
      <div>
        <div className="artist-info animated bounceInLeft">
          {this.state.artistInfo}
          <div className="powered-by">
            powered by
            <a href="https://www.discogs.com" target="_blank"> discogs</a>
          </div>
        </div>
      </div>
    );
  }

  hideError = () => {
    PlaylistActions.hideError();
  }

  renderErrorMessage = () => {
    return (
      <div>
        <div className="error animated bounce" onClick={this.hideError}>
          {this.state.errorMessage}
          <div className="close">close</div>
        </div>
      </div>
    );
  }

  clickForSimilarArtists = () => {
    return (
      <div className="learn-more">
        Click here to find similar artists from spotify
      </div>
    );
  }

  clickForArtistInfo = () => {
    return (
      <div className="learn-more">
        Click here to learn more about this artist from discogs
      </div>
    )
  }

  // RENDER AREA : : : : : : : :
  render() {
    const tracks = this.state.tracks;
    return (
      <div className="pure-g main-container">
        <div className="pure-u-1-3">
            {
              this.state.activePlayer ?
              <div className="artist-info-area">
                <div className="similar-artists" onClick={this.getArtistInfo} >
                  {
                    this.state.artistInfo === "" ?
                      this.clickForArtistInfo() : this.renderArtistInfo()
                  }
                </div>
              </div>
                : null
            }
        </div>
        <div className="pure-u-1-3 main-area">
          <div className="error-area">
            {
              this.state.errorMessage !== "" ? this.renderErrorMessage()
                : null
            }
          </div>
          <div className="new-track">
            <div>
              <input placeholder="paste a soundcloud url here" ref="newTrack" />
            </div>
            <div className="down-button-div">
              <button className="pure-button pure-button-primary"
                onClick={this.createTrack.bind(this)}>&darr;</button>
            </div>
          </div>
          <div className="track-list">
            <TrackList tracks={tracks}
              onDelete={this.deleteTrack}
              pickTrack={this.pickTrack}
            />
          </div>
          <div className="player-area">
              <Player
                track={this.state.currentTrackUri}
                playingTrack={this.state.playingTrack}
                similarArtists={this.getSimilarArtists}
                getArtistInfo={this.getArtistInfo}
                nextTrack={this.getNextTrack}
                nextTrackInfo={PlaylistStore.getNextTrackInfo()}
              />
            <div className="player-buttons">
              <button className="pure-button player-button" onClick={this.getPreviousTrack}>&#10510;</button>
              <button className="pure-button player-button" onClick={this.getNextTrack}>&#10511;</button>
            </div>
          </div>
        </div>
        <div className="pure-u-1-3 similar-artists-picture pure-img">
        {
          this.state.activePlayer ?
          <div className="similar-artists-area" onClick={this.getSimilarArtists} >
            <div className="similar-artists">
              {
                this.state.similarArtists.length === 0 ?
                  this.clickForSimilarArtists() :
                  this.renderSimilarArtists()
              }
            </div>
          </div>
            : null
        }
        </div>
      </div>
    );
  }
}
