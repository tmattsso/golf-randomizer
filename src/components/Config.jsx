import React from 'react';

class ConfigButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }

    render() {
      return (
        <button className="square" onClick={() => console.log('click')}>
            Config
          {this.props.value}
        </button>
      );
    }
   }
   
export default ConfigButton;