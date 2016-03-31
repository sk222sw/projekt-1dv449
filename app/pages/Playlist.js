import React from "react";

export default class Playlist extends React.Component {
  render() {
    // const { query } = this.props.location;
    const { params } = this.props;
    return (
      <h1>Playlist {params.playlist}</h1>
    );
  }
}
