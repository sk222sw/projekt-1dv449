import React from "react";

export default class Track extends React.Component {
  pickTrack = () => {
    return <span onClick={this.props.pickTrack}>{this.props.url}</span>;
  }

  updateTrack = () => {
    // return <button onClick={this.props.updateTrack}>edit</button>;
  }

  renderDelete = () => {
    return <button className="pure-button" onClick={this.props.onDelete}>&#10007;</button>;
  }

  render() {
    const onDelete = this.props.onDelete;
    return (
          <div>
            {this.pickTrack()}
            {onDelete ? this.renderDelete() : null}
          </div>
        );
  }
}

Track.propTypes = {
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  id: React.PropTypes.func,
  onDelete: React.PropTypes.func // tror jag
};
