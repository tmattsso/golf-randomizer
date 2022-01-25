import React from 'react';

class Shotlist extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  renderShot(shot) {

    const key = shot.club;

    return (
      <div key={key} className='shot-list-item'>
        <div className='text'>{shot.club}</div>
        <div className='count'>({shot.count})</div>
        <div className='box'><input type="checkbox" checked={shot.enabled} data-in={key} onChange={this.handleChange} /></div>
      </div>
    )
  }

  handleChange(event) {
    const target = event.target;
    this.props.updateEnabled(target.dataset.in, target.checked)
  }

  render() {

    const list = this.props.shots.map((s) =>
      this.renderShot(s)
    )
    return (
      <div className='shot-list'>
        {list}
      </div>
    );
  }

}

export default Shotlist;