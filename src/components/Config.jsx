import React from 'react';
import Select from 'react-select';

class ConfigButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeShotList(event.value)
  }

  render() {

    const options = this.props.availableLists.map(l =>
      ({ "value": l, "label": l })
    );

    var defaultVal = options[this.props.selectedList];

    return (
      <div className='configArea'>
        <button className="resetButton" onClick={this.props.resetShotData}>
          R
        </button>
        <div className='label'>List:</div>
        <Select className='listSelect' options={options} value={defaultVal} onChange={this.handleChange} />

      </div>
    );
  }
}

export default ConfigButton;