import React from "react";
import { Link } from "react-router";

import PlaylistStore from "../stores/PlaylistStore";
import * as PlaylistActions from "../actions/PlaylistActions";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: "",
      showCreateButton: true
    };
  }

  componentWillMount() {
    PlaylistStore.on("change", this.getPlaylistId);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("change", this.getPlaylistId);
  }

  getPlaylistId = () => {
    this.setState({
      playlistId: PlaylistStore.getId(),
      showCreateButton: false
    });
  }

  createPlurlist = () => {
    this.setState({
      showCreateButton: false
    });
    PlaylistActions.createPlaylist();
  }

  playlistUrl = () =>
    `http://${window.location.host}/#/playlist/${this.state.playlistId}`;

  renderLink = () => {
    return (
      <p>
        Great, here is your link:
        <Link to={`/playlist/${this.state.playlistId}`}>
          {this.playlistUrl()}
        </Link>
      </p>
    );
  }

  render() {
    this.playlistUrl();
    return (
      <div className="pure-g main">
        <div className="pure-u-1-4"></div>
        <div className="pure-u-1-2">
          <p>plurlist is a simple tool to create playlists containing
          music from different sources</p>
          <p>no registering needed - just create your playlist and bookmark it</p>
          <div>
          </div>
          <div>
            {this.state.showCreateButton ?
              <button className="pure-button pure-button-primary button-shadow"
                onClick={this.createPlurlist}>Click here to get started</button> :
                this.renderLink()
            }
          </div>
          <br />
            <Link to="/playlist/5714c45730de0c44035c43cc" className="" >
              here's a develop link
            </Link>
        </div>
      </div>
    );
  }
}
