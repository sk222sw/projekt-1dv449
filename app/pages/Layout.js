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
        <Link to="playlist/56e972b23f5229f01a57b7a8">temp</Link>
        <Footer />
      </div>
    );
  }
}
