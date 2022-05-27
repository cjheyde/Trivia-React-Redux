// ref. https://stackoverflow.com/questions/40885923/countdown-timer-in-react
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 5,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const { seconds } = this.state;
    const timeLeftVar = this.secondsToTime(seconds);
    this.setState({ time: timeLeftVar });
  }

  secondsToTime(secs) {
    const SESSENTA = 60;
    const hours = Math.floor(secs / (SESSENTA * SESSENTA));

    const divisorMinutes = secs % (SESSENTA * SESSENTA);
    const minutes = Math.floor(divisorMinutes / SESSENTA);

    const divisorSeconds = divisorMinutes % SESSENTA;
    const seconds = Math.ceil(divisorSeconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  startTimer() {
    const { seconds } = this.state;
    const MIL = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, MIL);
    }
  }

  countDown() {
    const { seconds } = this.state;
    this.setState({
      seconds: seconds - 1,
      time: this.secondsToTime(seconds),
    });
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ this.startTimer }
        >
          Start
        </button>
        m:
        { time.m }
        s:
        { time.s }
      </div>
    );
  }
}

export default Timer;
