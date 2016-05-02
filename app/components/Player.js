/* global SC */

import React from "react";
import PlaylistStore from "../stores/PlaylistStore";
import * as PlaylistActions from "../actions/PlaylistActions";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.nextSoundCloudUrl = "";
  }

  componentWillMount() {
    PlaylistStore.on("next-track", this.renderPlayer);
    // PlaylistStore.on("got-next-soundcloud-url", this.logy);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("next-track", this.renderPlayer);
    PlaylistStore.removeListener("got-next-soundcloud-url", this.logy);
  }

  nothing = () => {}

  logy = () => {
    this.nextSoundCloudUrl = PlaylistStore.getNextSoundCloudUrl();
    console.log("next är:", PlaylistStore.getNextSoundCloudUrl());
  }

  renderPlayer = () => {
    const nextSound = this.props.nextTrackInfo;
    // this.nextSoundCloudUrl = PlaylistStore.getNextSoundCloudUrl();
    // console.log("nextsound:", nextSound);
    // console.log("next soundcloud url", PlaylistStore.nextSoundCloudUrl);
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = "https://w.soundcloud.com/player/?url=" + this.props.track;
    const widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      widget.play();
    });
    widget.bind(SC.Widget.Events.FINISH, () => {
      widget.load(nextSoundCloudUrl, {
        show_artwork: false
      });

      // HÄMTA nästa track när den här spelas, lägg till den som newSoundUrl
      // ladda den sen och det blir autoplay

      // this.props.nextTrack();
      widget.bind(SC.Widget.Events.READY, () => {
        widget.play();
      });
    });
  }

  renderTrackInfo = () => {
    return (
      <div>
        <div>
          Title: {this.props.playingTrack.title}
        </div>
        <div>
          Username: {this.props.playingTrack.userName}
          <button onClick={this.props.similarArtists}>similar</button>
          <button onClick={this.props.getArtistInfo}>info</button>
        </div>
    </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.track !== "" ?
            this.renderTrackInfo() :
            null
        }
        <div id="trackPlayer">
          <iframe id="sc-widget" frameBorder="0"></iframe>
        </div>
      </div>
    );
  }
}
