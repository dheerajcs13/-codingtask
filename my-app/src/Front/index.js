import React from 'react';
import { VIEW_MODE_COMPONENT, Tiles } from './Front.factory';
import './front.css';

class ForntPage extends React.PureComponent {
  state = {
    view: 'trailer',
  }

  handleTiles = (value) => () => {
    this.setState({view: value});
  }
  render(){
    const {
      view
    } = this.state;
    const Components = VIEW_MODE_COMPONENT[view];
    return(
      <React.Fragment>
        <h1>
          {
            Tiles.map((tile) =>
              <span
                  key={tile.label}
                  onClick={this.handleTiles(tile.value)}
                  className={`tiles ${view === tile.value ? 'active' : ''}`}
              >
                {tile.label}
              </span>
              )
          }
        </h1>
        <Components />
      </React.Fragment>
    );
  }
}

export default ForntPage;
