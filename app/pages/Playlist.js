import React from "react";

export default class Playlist extends React.Component {
  render() {
    console.log(this.props);
    const { params } = this.props;
    return (
      <h1>Playlist {params.playlist}</h1>
    );
  }
}
