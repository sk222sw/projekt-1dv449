/* global SC (for eslint) */

import React from "react";
import PlaylistStore from "../stores/PlaylistStore";

export default class Player extends React.Component {
  componentWillMount() {
    PlaylistStore.on("next-track", this.renderPlayer);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("next-track", this.renderPlayer);
  }

  nothing = () => {}

  renderPlayer = () => {
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = "https://w.soundcloud.com/player/?url=" + this.props.track;
    const widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      widget.play();
    });

    widget.bind(SC.Widget.Events.FINISH, () => {
      this.props.nextTrack();
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
