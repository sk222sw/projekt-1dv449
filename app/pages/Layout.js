import React from "react";
import { Link } from "react-router";

import Footer from "./../layout/Footer";
import Header from "./../layout/Header";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Link to="playlist" activeClassName="activeLink">Playlist</Link>
        <Footer />
      </div>
    );
  }
}
