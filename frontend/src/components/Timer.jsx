import React from 'react';
// import Clock from 'react-flip-clock-en';
import Countdown from 'react-countdown-now';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Countdown date={Date.now() + 5000} />;
  }
}

export default Timer;
