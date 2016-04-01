import React from "react";
import { Link } from "react-router";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: "",
      showCreateButton: true
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
      this.state.showCreateButton = false;
      return result.json();
    })
    .then(json => {
      this.setState({
        playlistId: json._id
      });
    });
  }

  playlistUrl = () =>
    `http://${window.location.host}/#/playlist/${this.state.playlistId}`;

  render() {
    this.playlistUrl();
    return (
      <div>
        <p>plurlist is a simple tool to create playlists containing music from different sources</p>
        <p>no registering needed - just create your playlist and bookmark it</p>
        {this.state.showCreateButton ?
          <button onClick={this.createPlurlist}>Create plurlist</button> :
            <p>
              Great, here is your link:
              <Link to={`/playlist/${this.state.playlistId}`}>
                {this.playlistUrl()}
              </Link>
            </p>
        }
      </div>
    );
  }
}
