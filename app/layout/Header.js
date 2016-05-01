import React from "react";
import { Link } from "react-router";

import PlaylistStore from "../stores/PlaylistStore";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = PlaylistStore.getState();
  }

  componentWillMount() {
    PlaylistStore.on("change", this.updateState);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener("change", this.updateState);
  }

  nothing = () => {}

  updateState = () => {
    this.setState(PlaylistStore.getState());
  }

  renderTitle = () => {
    return (
      <Link to="/"><h1>plurlist</h1></Link>
    );
  }

  showLoader = () => {
    return (
      <h1>
        <div className="sound-bar">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
        </div>
      </h1>
    );
  }

  render() {
    return (
      <div className="pure-g">
        <header className="pure-u-24-24">
          {
            this.state.loader === true
              ? this.showLoader()
              : this.renderTitle()
          }
        </header>
      </div>
    );
  }
}
