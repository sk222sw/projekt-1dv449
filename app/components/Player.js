import React from "react";
import SC from "api/SC";


export default class Player extends React.Component {
  constructor() {
    super();
    console.log(this.props);
    this.state = {

    }
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
    const iframeString = "<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url="+ track.uri + "'></iframe>";
    $('#trackPlayer').html(iframeString);

    var widgetIframe = document.getElementById('sc-widget');
    var widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, function(){
      widget.play();
    });

    widget.bind(SC.Widget.Events.FINISH, function() {
      app.AutoLoadNextTrack();
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.soundCloud()}></button>
        <div id="trackPlayer">
          <iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=https://soundcloud.com/ben-klock/ben-klock-subzero-original-mix'></iframe>
        </div>
      </div>
    );
  }
}
