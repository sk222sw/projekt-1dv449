/* global SC (for eslint) */

import React from "react";
import * as PlaylistActions from "../actions/PlaylistActions";
import PlaylistStore from "../stores/PlaylistStore";

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      track: "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites"
    };
  }

  componentDidMount() {
    console.log("props", this.props);
    this.createSoundCloudPlayer();
    PlaylistStore.on("next-track", this.createSoundCloudPlayer);
  }

  getNextTrack = () => {
    console.log("getting next track", this.props.track.url);
    PlaylistActions.nextTrack();
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
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = this.props.track.url;
    const widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      widget.bind(SC.Widget.Events.PLAY, () => {
        console.log("play");
      });
    });
  }

  play = () => {
    console.log("hej");
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.getNextTrack}>Next</button>
        </div>
        <div id="trackPlayer">
          <iframe id="sc-widget"></iframe>
        </div>
      </div>
    );
  }
}

// <button onClick={this.soundCloud()}></button>
