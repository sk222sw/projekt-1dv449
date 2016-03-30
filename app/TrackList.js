import React from "react";
import Track from "./Track";

export default ({tracks, onDelete}) => {
    return (
      <ul>
        {
          tracks.map(track =>
          <li key={track.id}>
            <Track
              title={track.title}
              onDelete={onDelete.bind(null, track.id)} />
          </li>
      )}</ul>
    );
};
