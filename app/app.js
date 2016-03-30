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

    this.fetchData();
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
    this.setState({
      tracks: this.state.tracks.concat([{
        id: uuid.v4(),
        title: "new track"
      }])
    });
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
        <button onClick={this.addTrack}>+</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
