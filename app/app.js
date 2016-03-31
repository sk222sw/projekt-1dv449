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
          title: ""
        }
      ]
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
            id: uuid.v4(),
            title: track.title
          }])
        });
      });
    });
  }

  addTrack = () => {
    const title = this.refs.newTrack.value;
    this.setState({
      tracks: this.state.tracks.concat([{
        id: uuid.v4(),
        title: title
      }])
    });
    this.addToDatabase();
  }

  addToDatabase = () => {
    const title = this.refs.newTrack.value;
    const playlistId = this.props.params.playlist;
    var http = new XMLHttpRequest();
    var url = "/playlist/";
    var params = `id=${playlistId}&title=${title}`;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
        }
    }
    http.send(params);
  }

  deleteTrack = (id, e) => {
    e.stopPropagation();

    this.setState({
      tracks: this.state.tracks.filter(track => track.id !== id)
    });
  }

  render() {
    const tracks = this.state.tracks;
    return (
      <div>
        <form id="newTrackForm">
          <input ref="newTrack" />
        </form>
        <button onClick={this.addTrack}>+</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
