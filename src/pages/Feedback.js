import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import LogoTrivia from '../components/LogoTrivia';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedbackMessage: '',
    };
  }

  componentDidMount() {
    const { assertionsFromStore } = this.props;
    this.setFeedbackMessage(assertionsFromStore);
  }

  setFeedbackMessage(assertionsFromStore) {
    const MIN_CORRECT_ANSWERS = 3;
    if (assertionsFromStore >= MIN_CORRECT_ANSWERS) {
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
    const { score, assertionsFromStore } = this.props;
    return (
      <main>
        <Header />
        <LogoTrivia />
        <h2 data-testid="feedback-text">{feedbackMessage}</h2>
        <h3>Placar Final: Você fez</h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h3>pontos</h3>
        <br />
        <h3>Você acertou </h3>
        <h3 data-testid="feedback-total-question">{ assertionsFromStore }</h3>
        <h3>questões</h3>
        <Link to="/">
          <button
            type="button"
            name="play-again-button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <br />
        <Link to="/ranking">
          <button
            type="button"
            name="ranking-button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = (store) => ({
  assertionsFromStore: store.player.assertions,
  score: store.player.score,
});

Feedback.propTypes = {
  assertionsFromStore: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
