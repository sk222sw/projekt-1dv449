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
          trackNumber: 1
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
            id: this.state.tracks.length + 1,
            title: track.title,
            trackNumber: this.state.tracks.length + 1
          }])
        });
      });
    });
  }

  addTrack = () => {
    const title = this.refs.newTrack.value;
    if (title !== "") {
      this.setState({
        tracks: this.state.tracks.concat([{
          id: this.state.tracks.length + 1,
          title: title,
          trackNumber: this.state.tracks.length + 1
        }])
      });
      this.addToDatabase();
    }
  }

  addToDatabase = () => {
    const title = this.refs.newTrack.value;
    const playlistId = this.props.params.playlist;

    const track = {
      "type": "",
      "title": title,
      "number": 1,
      "uri": "",
      "user": {},
      "artist": "",
      "id": uuid.v4()
    }

    const data = {
      "playlistId": playlistId,
      "track": track
    }

    const http = new XMLHttpRequest();
    const url = "/playlist/";
    const params = `id=${playlistId}&title=${title}`;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
        }
    }
    http.send(JSON.stringify(data));
  }

  deleteTrack = (id, e) => {
    e.stopPropagation();
    const trackNumber = id;
    const playlistId = this.props.params.playlist;
    const http = new XMLHttpRequest();
    const url = `/playlist/${playlistId}/delete/${trackNumber}`;
    const params = `id=${playlistId}&title=${trackNumber}`;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
        }
    }
    http.send(params);

    console.log("id: ", id);
    this.setState({
      tracks: this.state.tracks.filter(track => track.id !== id)
    });
  }

  render() {
    const tracks = this.state.tracks;
    return (
      <div>
        <input ref="newTrack" />
        <button onClick={this.addTrack}>&#8594;</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
