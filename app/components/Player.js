/* global SC (for eslint) */

import React from "react";
import PlaylistStore from "../stores/PlaylistStore";

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      track: "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites"
    };
    this.url = "";
  }

  componentDidMount() {
    PlaylistStore.on("next-track", this.reRenderPlayer);
  }

  soundCloud = () => {
    fetch("/apiHandler/")
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  createSoundCloudPlayer = () => {
    if (this.url !== "") {
      const widgetIframe = document.getElementById('sc-widget');
      widgetIframe.src = this.state.track;
      const widget = SC.Widget(widgetIframe);
      widget.bind(SC.Widget.Events.READY, () => {
        widget.bind(SC.Widget.Events.PLAY, () => {
          console.log("play");
        });
      });
    }
  }

  reRenderPlayer = () => {
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
        now playing: {this.props.track}
        <button onClick={this.reRenderPlayer}>cool button</button>
        <div id="trackPlayer">
          <iframe id="sc-widget" frameBorder="0"></iframe>
        </div>
      </div>
    );
  }
}

// <button onClick={this.soundCloud()}></button>
