import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../components/Header';
import LogoTrivia from '../components/LogoTrivia';

class Feedback extends Component {
  componentDidMount() {
    const { assertionsFromStore } = this.props;
    this.setRankingByPlayer();
    this.setFeedbackMessage(assertionsFromStore);
  }

  setRankingByPlayer = () => {
    const { nameFromStore, scoreFromStore, gravatarEmailFromStore } = this.props;
    const hashGerada = md5(gravatarEmailFromStore).toString();
    const ranks = JSON.parse(localStorage.getItem('ranking'));
    const playerRank = { name: nameFromStore, score: scoreFromStore, picture: `https://www.gravatar.com/avatar/${hashGerada}` };
    if (ranks) {
      localStorage.setItem('ranking', JSON.stringify([...ranks, playerRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerRank]));
    }
  }

  setFeedbackMessage(numberCorrectAnswers) {
    const MIN_CORRECT_ANSWERS = 3;
    if (numberCorrectAnswers >= MIN_CORRECT_ANSWERS) {
      this.setState({
        feedbackMessage: 'Well Done!',
      });
    } else {
      this.setState({
        feedbackMessage: 'Could be better...',
      });
    }
  }

  render() {
    const { feedbackMessage } = this.state;
    return (
      <header>
        <LogoTrivia />
        <Header />
        <h3>{feedbackMessage}</h3>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  assertionsFromStore: store.player.assertions,
  gravatarEmailFromStore: store.player.gravatarEmail,
  nameFromStore: store.player.name,
  scoreFromStore: store.player.score,
});

Feedback.propTypes = {
  assertionsFromStore: PropTypes.number,
  gravatarEmailFromStore: PropTypes.string,
  nameFromStore: PropTypes.string,
  scoreFromStore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
