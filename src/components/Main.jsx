import React from 'react';

import Shotlist from './Shotlist';
import ConfigButton from './Config'
import WheelArea from './Wheel'
import shotdata from '../shotlist.json'


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: shotdata,
    };

    this.state.shots.forEach(element => {
      element.enabled = true;
      element.count = 0;
    });

    this.updateShotEnabled = this.updateShotEnabled.bind(this);
    this.addShotCount = this.addShotCount.bind(this);
  }

  updateShotEnabled(club, enabled) {

    //TODO dont clone full state
    const newState = Object.assign({}, this.state);

    var index = this.state.shots.findIndex(x => x.club === club);
    newState.shots[index].enabled = enabled;
    this.setState(newState);
  }

  addShotCount(club) {

    //TODO dont clone full state
    const newState = Object.assign({}, this.state);

    var index = this.state.shots.findIndex(x => x.club === club);
    newState.shots[index].count++;
    this.setState(newState);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">

          <ConfigButton />
          <WheelArea shots={this.state.shots} addShotCount={this.addShotCount} updateEnabled={this.updateShotEnabled} />
          <Shotlist shots={this.state.shots} updateEnabled={this.updateShotEnabled} />
        </header>
      </div>
    );
  }
}

export default Main;