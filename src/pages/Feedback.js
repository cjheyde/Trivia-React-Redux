import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    return (
      <main>
        <Header />
        <LogoTrivia />
        <h3 data-testid="feedback-text">{feedbackMessage}</h3>
      </main>
    );
  }
}

const mapStateToProps = (store) => ({
  assertionsFromStore: store.player.assertions,
});

Feedback.propTypes = {
  assertionsFromStore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
