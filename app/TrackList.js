import React from "react";
import Track from "./Track";

export default ({ tracks, onDelete, pickTrack, updateTrack }) => {
  return (
    <ul>{tracks.map(track =>
        <li key={track.id}>
          <Track
            title={track.title}
            url={track.url}
            pickTrack={pickTrack.bind(null, track.url)}
            updateTrack={updateTrack.bind(null, track.id)}
            onDelete={onDelete.bind(null, track.id)} />
        </li>
    )}</ul>
  );
};
