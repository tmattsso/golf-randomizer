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
      new Object({ value: l, label: l })
    );

    var defaultVal = options[this.props.selectedList];

    return (
      <div className='configArea'>
        <div className='label'>List:</div>
        <Select className='listSelect' options={options} defaultValue={defaultVal} onChange={this.handleChange} />
      </div>
    );
  }
}

export default ConfigButton;