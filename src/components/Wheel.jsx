import React from 'react';

class WheelArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      spinAgainText: "Press to spin",
      buttonText: "",
      lastShot: null,
    };

    this.spin = this.spin.bind(this);
    this.removeAndSpin = this.removeAndSpin.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


    const oldShots = prevProps.shots.filter(s => s.enabled).length;
    const enabledShots = this.props.shots.filter(s => s.enabled).length;

    //TODO fix this

    if (oldShots > 0 && enabledShots === 0) {
      this.setState({
        submitting: true,
        spinAgainText: "No shots selected!",
      });
    } else if (oldShots === 0 && enabledShots > 0) {
      this.setState({
        submitting: false,
        spinAgainText: "Press to spin",
      });

    }
  }

  spin(event) {

    const enabledShots = this.props.shots.filter(s => s.enabled);

    const shot = enabledShots[Math.floor(Math.random() * enabledShots.length)];

    setTimeout(() => {
      this.props.addShotCount(shot.club);
      this.setState({
        submitting: false,
      });

      this.renderResult(shot);
    }, 1000);

    this.setState({
      submitting: true,
      lastShot: shot.club
    });
  }

  removeAndSpin(event) {
    // disable in shot list 
    this.props.updateEnabled(this.state.lastShot, false);

    //spin again
    // TODO how;  we need to wait for new props
    // this.spin(event);
  }

  renderResult(shot) {

    var text = shot.club;

    this.setState({
      buttonText: text
    });
  }

  render() {
    return (
      <div className="wheelArea">
        <button className="wheelButton" onClick={this.spin} disabled={this.state.submitting}>

          <div className='winner'>{this.state.buttonText}</div>
          <div className='spin-again'>{this.state.spinAgainText}</div>

        </button>
        {this.state.buttonText.length > 0 &&
          <button className="removeButton" onClick={this.removeAndSpin} disabled={this.state.submitting}>
            Remove and spin again
          </button>
        }
      </div>
    );
  }
}

export default WheelArea;