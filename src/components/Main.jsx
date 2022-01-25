import React from 'react';

import Shotlist from './Shotlist';
import ConfigButton from './Config'
import WheelArea from './Wheel'
import shotdata from '../shotlist.json'


class Main extends React.Component {

  constructor(props) {
    super(props);

    const selectedList = shotdata[0].name;
    this.state = {
      shotdata: shotdata,
      selectedShotList: selectedList,
    };

    this.state.shotdata.forEach(shotlist => {
      shotlist.shots.forEach(element => {
        element.enabled = true;
        element.count = 0;
      })
    });


    this.updateShotEnabled = this.updateShotEnabled.bind(this);
    this.addShotCount = this.addShotCount.bind(this);
    this.changeShotList = this.changeShotList.bind(this);
  }

  getShotList() {
    return this.state.shotdata[this.getShotListIndex()].shots;
  }

  getShotListIndex() {
    const index = this.state.shotdata.findIndex(x => x.name === this.state.selectedShotList);
    return index;
  }


  updateShotEnabled(club, enabled) {

    //TODO dont clone full state
    const newShotData = Object.assign([], this.state.shotdata);
    const listIndex = this.getShotListIndex();

    var index = newShotData[listIndex].shots.findIndex(x => x.club === club);
    newShotData[listIndex].shots[index].enabled = enabled;

    this.setState({
      shotdata: newShotData,
    });
  }

  addShotCount(club) {

    //TODO dont clone full state
    const newShotData = Object.assign([], this.state.shotdata);
    const listIndex = this.getShotListIndex();

    var index = newShotData[listIndex].shots.findIndex(x => x.club === club);
    newShotData[listIndex].shots[index].count++;

    this.setState({
      shotdata: newShotData,
    });
  }

  changeShotList(list) {
    this.setState({
      selectedShotList: list,
    });
  }

  render() {

    const availableLists = this.state.shotdata.map(shotlist => shotlist.name);
    var index = this.state.shotdata.findIndex(x => x.name === this.state.selectedShotList);

    return (
      <div className="App">
        <header className="App-header">

          <ConfigButton selectedList={index} availableLists={availableLists} changeShotList={this.changeShotList} />
          <WheelArea shots={this.getShotList()} addShotCount={this.addShotCount} updateEnabled={this.updateShotEnabled} />
          <Shotlist shots={this.getShotList()} updateEnabled={this.updateShotEnabled} />
        </header>
      </div>
    );
  }
}

export default Main;