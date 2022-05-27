// ref. https://stackoverflow.com/questions/40885923/countdown-timer-in-react
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timer: 0,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    const { seconds } = this.state;
    let { timer } = this.state;
    const MIL = 1000;
    if (timer === 0 && seconds > 0) {
      timer = setInterval(this.countDown, MIL);
    }
  }

  countDown = () => {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({
        seconds: seconds - 1,
      });
    }
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        Tempo:
        {' '}
        {seconds}
      </div>
    );
  }
}

export default Timer;
