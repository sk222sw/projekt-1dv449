import React from "react";
import { Link } from "react-router";

export default class Header extends React.Component {
  render() {
    return (
      <div className="pure-g">
        <header className="pure-u-24-24">
          <Link to="/"><h1>plurlist</h1></Link>
        </header>
      </div>
    );
  }
}
