import React from "react";

import Footer from "./../layout/Footer";
import Header from "./../layout/Header";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
