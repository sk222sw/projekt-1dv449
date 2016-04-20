/* global SC (for eslint) */

import React from "react";
import PlaylistStore from "../stores/PlaylistStore";

export default class Player extends React.Component {
  // ändrade precis componentDidMount till componentWillMount ifall nåt buggar
  componentWillMount() {
    PlaylistStore.on("next-track", this.renderPlayer);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("next-track", this.renderPlayer);
  }

  renderPlayer = () => {
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = "https://w.soundcloud.com/player/?url=" + this.props.track;
    const widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      widget.bind(SC.Widget.Events.PLAY, () => {
        console.log("play");
      });
    });
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
