import React from "react";
import TrackList from "./TrackList";
import uuid from "node-uuid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {
          id: uuid.v4(),
          title: "",
        }
      ],
      displayFlash: false,
      flashMessage: "nullah!"
    };
    if (this.props.params.playlist) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const playlistId = this.props.params.playlist;
    const request = new Request(`./playlist/${playlistId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "text/json"
      })
    });

    fetch(request).then(result => {
      return result.json();
    })
    .then(j => {
      j[0].tracks.map(track => {
        this.setState({
          tracks: this.state.tracks.concat([{
            id: track.id,
            title: track.title
          }])
        });
      });
    });
  }

  addTrack = () => {
    const trackId = uuid.v4();
    const title = this.refs.newTrack.value;
    if (this.validateUrl(title)) {
      this.setState({
        tracks: this.state.tracks.concat([{
          id: trackId,
          title
        }]),
        displayFlash: true,
        flashMessage: "Added track"
      });
      this.addToDatabase(trackId);
    } else {
      this.setState({
        displayFlash: true,
        flashMessage: "That doesnt seem to be a valid URL"        
      })
    }
  }

  validateUrl = (urlString) => {
    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlRegex.test(urlString.toLowerCase());
  }

  addToDatabase = (trackId) => {
    const title = this.refs.newTrack.value;
    const playlistId = this.props.params.playlist;
    const track = {
      type: "",
      title,
      number: 1,
      uri: "",
      user: {},
      artist: "",
      id: trackId
    };

    const data = {
      playlistId,
      track
    };

    const http = new XMLHttpRequest();
    const url = "/playlist/";
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.status);
      } else {

      }
    };
    http.send(JSON.stringify(data));
  }

  deleteTrack = (id, e) => {
    e.stopPropagation();
    const playlistId = this.props.params.playlist;
    const http = new XMLHttpRequest();
    const url = `/playlist/${playlistId}/delete/${id}`;
    const params = `id=${playlistId}&title=${id}`;

    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      console.log("http.status");
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);
      }
    };
    http.send(params);

    this.setState({
      tracks: this.state.tracks.filter(track => track.id !== id),
      displayFlash: true,
      flashMessage: "Deleted track"
    });
  }

  // flash = () => {
  //   return this.state.flashMessage;
  // }

  render() {
    const tracks = this.state.tracks;
    return (
      <div>
        {
          this.state.displayFlash ?
            <p>{this.state.flashMessage}</p> :
            null
        }
        <input ref="newTrack" />
        <button onClick={this.addTrack}>&#8594;</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
