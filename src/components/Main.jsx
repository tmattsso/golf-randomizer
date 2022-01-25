import React from 'react';

import Shotlist from './Shotlist';
import ConfigButton from './Config'
import WheelArea from './Wheel'
import shotdata from '../shotlist.json'

const storageName = "shotlist-cache";
const storageNameSelected = "shotlist-selected";

class Main extends React.Component {


  constructor(props) {
    super(props);

    const shots = this._loadShotData();
    const selectedList = this._loadSelectedList(shots[0].name);

    this.state = {
      shotdata: shots,
      selectedShotList: selectedList,
    };

    this.updateShotEnabled = this.updateShotEnabled.bind(this);
    this.addShotCount = this.addShotCount.bind(this);
    this.changeShotList = this.changeShotList.bind(this);
    this.resetShotData = this.resetShotData.bind(this);
  }

  _loadShotData() {

    var shots = localStorage.getItem(storageName);

    if (shots) {
      shots = JSON.parse(shots);
    } else {
      shots = this.resetShotData();
    }

    return shots;
  }

  _loadSelectedList(defaultList) {

    var listname = localStorage.getItem(storageNameSelected);

    if (!listname) {
      listname = defaultList;
    }

    return listname;
  }

  _saveShotData() {
    setTimeout(() => {
      localStorage.setItem(storageName, JSON.stringify(this.state.shotdata));
      localStorage.setItem(storageNameSelected, this.state.selectedShotList);
    }, 200);
  }

  resetShotData() {
    const shots = Object.assign([], shotdata);
    shots.forEach(shotlist => {
      shotlist.shots.forEach(element => {
        element.enabled = true;
        element.count = 0;
      })
    });

    this.setState({
      shotdata: shots,
      selectedShotList: shots[0].name,
    });

    localStorage.removeItem(storageName);
    localStorage.removeItem(storageNameSelected);
    return shots;
  }

  getShotList() {
    return this.state.shotdata[this._getShotListIndex()].shots;
  }

  _getShotListIndex() {
    const index = this.state.shotdata.findIndex(x => x.name === this.state.selectedShotList);
    return index;
  }

  updateShotEnabled(club, enabled) {
    this._modifyShot(club, o => o.enabled = enabled);
    this._saveShotData()
  }

  addShotCount(club) {
    this._modifyShot(club, o => o.count++);
    this._saveShotData()
  }

  _modifyShot(club, op) {

    //TODO don't clone full shot list
    const newShotData = Object.assign([], this.state.shotdata);
    const listIndex = this._getShotListIndex();

    const index = newShotData[listIndex].shots.findIndex(x => x.club === club);
    const shot = newShotData[listIndex].shots[index];
    op(shot);

    this.setState({
      shotdata: newShotData,
    });
  }

  changeShotList(list) {
    this.setState({
      selectedShotList: list,
    });
    this._saveShotData();
  }

  render() {

    const availableLists = this.state.shotdata.map(shotlist => shotlist.name);
    const index = this.state.shotdata.findIndex(x => x.name === this.state.selectedShotList);

    return (
      <div className="App">
        <header className="App-header">

          <ConfigButton selectedList={index} availableLists={availableLists} changeShotList={this.changeShotList} resetShotData={this.resetShotData} />
          <WheelArea shots={this.getShotList()} addShotCount={this.addShotCount} updateEnabled={this.updateShotEnabled} />
          <Shotlist shots={this.getShotList()} updateEnabled={this.updateShotEnabled} />
        </header>
      </div>
    );
  }
}

export default Main;