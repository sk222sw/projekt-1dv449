import React from "react";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: ""
    };

  }

  createPlurlist = () => {
    const request = new Request(`./playlist/new`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    fetch(request)
    .then(result => {
      console.log("result: ", result);
      return result.json();
    })
    .then(json => {
      console.log(json._id);
      this.setState({
        playlistId: json._id
      })
    })
    .then(() => {
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <p>plurlist is a simple tool to create playlists containing music from different sources</p>
        <p>no registering needed - just create your playlist and bookmark it</p>
        <button onClick={this.createPlurlist}>Create plurlist</button>
        {this.state.playlistId}
      </div>
    );
  }
}
