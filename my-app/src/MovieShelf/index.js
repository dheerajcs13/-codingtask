import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _ceil from 'lodash/ceil';
import _values from 'lodash/values';

import data from './response';

import Trailer from '../Trailer';

import './movieShelf.css';


class MovieShelf extends React.PureComponent{
  state = {
    tiles: _values(_get(data, [1])),
    videoLink: '',
    selectedIndex: 0,
  }

  playVideo = (item, index) => () => {
    const { TrailerURL, EventName } = item
    const completeUrl = new URL(TrailerURL);
    const params = new URLSearchParams(completeUrl.search);
    const videoId = params.get('v');
    this.setState({
      videoLink: videoId,
      name: EventName,
      selectedIndex: index + 1,
    })
  }

  renderList = () => {
    const { tiles, videoLink, EventName, selectedIndex } = this.state;
    const trailer = videoLink ? (
        <div className="movieTrailer">
          <Trailer videoLink={videoLink} eventName={EventName} />
        </div>
      ): null;
    const tilesNode = _map(tiles, (item, index) => {
      const imgurl = `https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/${item.EventImageCode}.jpg`
      return (
        <div key={item.EventCode} className="movieTile" onClick={this.playVideo(item, index)}>
          <div className="tileImage"
            style={{
              backgroundImage: `url(${imgurl})`
            }}
          >
          </div>
          <div className="tileName">{item.EventName}</div>
        </div>
      )
    });
    const tilesArray = [ ...tilesNode ];
    const row = ((_ceil(selectedIndex/4)-1)*4);
    tilesArray.splice(row, 0, trailer);
    return tilesArray;
  }
  render() {
    return (
      <React.Fragment>
        <div className="movieShelf">
          {this.renderList()}
        </div>
      </React.Fragment>
    );
  }
}

export default MovieShelf;
