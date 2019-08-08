import React from 'react';

function Trailer({ videoLink, eventName }) {
  return (
    <React.Fragment>
      <iframe
        title="This is a unique title"
        width="560" height="315"
        src={`https://www.youtube.com/embed/${videoLink}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
      <span>{eventName}</span>
    </React.Fragment>
  );
}

export default Trailer;