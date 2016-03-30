import React from "react";
import TrackList from "./TrackList";
import uuid from "node-uuid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNote = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.state = {
      tracks: [
        {
          id: uuid.v4(),
          title: "ben klock - sub zero"
        },
        {
          id: uuid.v4(),
          title: "aril brikha - berghain"
        }
      ]
    };
  }

  addTrack() {
    this.setState({
      tracks: this.state.tracks.concat([{
        id: uuid.v4(),
        title: "new track"
      }])
    });
  }

  deleteTrack(id, e) {
    e.stopPropagation();

    this.setState({
      tracks: this.state.tracks.filter(track => track.id !== id)
    });
  }

  render() {
    const tracks = this.state.tracks;
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <TrackList tracks={tracks}
          onDelete={this.deleteTrack}
        />
      </div>
    );
  }
}
