import React from "react";

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderDelete = this.renderDelete.bind(this);
  }

  renderDelete() {
    return <button onClick={this.props.onDelete}>x</button>;
  }


  render() {
    const onDelete = this.props.onDelete;
    return <div>
            <span>{this.props.title}</span>
            {onDelete ? this.renderDelete() : null}
          </div>;
  }
}