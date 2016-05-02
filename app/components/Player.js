/* global SC */

import React from "react";
import PlaylistStore from "../stores/PlaylistStore";
import * as PlaylistActions from "../actions/PlaylistActions";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.widget = null;
    this.nextSoundCloudUrl = "";
  }

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
    this.widget = SC.Widget(widgetIframe);
  }

  renderTrackInfo = () => {
    return (
      <div>
        <div>
          Username: {this.props.playingTrack.userName}
        </div>
        <div>
          Title: {this.props.playingTrack.title}
        </div>
    </div>
    );
  }

  render() {
    return (
      <div>
        <div id="trackPlayer">
          <iframe id="sc-widget" frameBorder="0"></iframe>
        </div>
      </div>
    );
  }
}
