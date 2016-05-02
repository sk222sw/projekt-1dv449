import React from "react";
import Track from "./Track";

export default ({ tracks, onDelete, pickTrack }) => {
  return (
    <div>{tracks.map(track =>
        <div key={track.id}>
          <Track
            title={track.title}
            url={track.url}
            pickTrack={pickTrack.bind(null, track.url)}
            onDelete={onDelete.bind(null, track.id)} />
        </div>
    )}</div>
  );
};
