import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { saveTimeAction } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = { timer: 0, seconds: 30, isButtonDisabled: false };
  }

  startTimer = () => {
    const { seconds } = this.state;
    let { timer } = this.state;
    const MIL = 1000;
    if (timer === 0 && seconds > 0) { timer = setInterval(this.countDown, MIL); }
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  countDown = () => {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({
        seconds: seconds - 1,
      });
    }
    if (seconds === 0) {
      this.setState({ isButtonDisabled: true });
      clearInterval(this.timer);
    }
  }

  saveTimeToStore = () => {
    const { seconds } = this.state;
    const { saveTime } = this.props;
    console.log(seconds);
    saveTime(seconds);
    this.stopTimer();
  }

  render() {
    const { isButtonDisabled, seconds } = this.state;
    return (
      <>
        <Header />
        <Questions
          isButtonDisabled={ isButtonDisabled }
          seconds={ seconds }
          saveTimeToStore={ this.saveTimeToStore }
          startTimer={ this.startTimer }
          stopTimer={ this.stopTimer }
        />
      </>
    );
  }
}

Game.propTypes = {
  saveTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTime: (time) => dispatch(saveTimeAction(time)),
});

export default connect(null, mapDispatchToProps)(Game);
