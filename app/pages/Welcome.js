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

  render() {
    this.playlistUrl();
    return (
      <div>
        <p>plurlist is a simple tool to create playlists containing music from different sources</p>
        <p>no registering needed - just create your playlist and bookmark it</p>
        <Link to="/playlist/5714c45730de0c44035c43cc">
          here's a develop link
        </Link>
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
