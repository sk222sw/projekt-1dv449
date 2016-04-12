import React from "react";

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      track: "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites"
    };
  }

  componentDidMount() {
    this.createSoundCloudPlayer();
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
    widgetIframe.src = this.state.track;
    const widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      widget.bind(SC.Widget.Events.PLAY, () => {
        console.log("play");
      })
    });
  }

  render() {
    return (
      <div>
        <div id="trackPlayer">
          <iframe id="sc-widget"></iframe>
        </div>
      </div>
    );
  }
}

// <button onClick={this.soundCloud()}></button>
