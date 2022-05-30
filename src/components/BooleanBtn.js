import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class BooleanBtn extends Component {
  shuffleBoolean = () => {
    const answers = ['True', 'False'];
    const LIMIT_VALUE = 0.5;
    const shuffledArray = answers.sort(() => Math.random() - LIMIT_VALUE);
    return shuffledArray;
  }

  render() {
    const { isButtonDisabled, okAnswer, rightAnswer, onClickAnswer } = this.props;
    const shuffledAnswers = this.shuffleBoolean();
    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, mapIndex) => (
          answer === rightAnswer
            ? (
              <Button
                value={ answer }
                buttonId="correctAnswer"
                buttonClass={ okAnswer ? 'correctAnswer' : 'answer' }
                answerRorW="correct-answer"
                isButtonDisabled={ isButtonDisabled }
                key={ `answerBtn${mapIndex}` }
                onClickFunction={ onClickAnswer }
                answer={ answer }
              />
            )
            : (
              <Button
                value={ answer }
                buttonId="wrongAnswer"
                buttonClass={ okAnswer ? 'wrongAnswer' : 'answer' }
                answerRorW="wrong-answer"
                isButtonDisabled={ isButtonDisabled }
                key={ `answerBtn${mapIndex}` }
                onClickFunction={ onClickAnswer }
                answer={ answer }
              />
            )
        )) }
      </div>);
  }
}

BooleanBtn.propTypes = {
  onClickAnswer: PropTypes.func,
  okAnswer: PropTypes.bool,
  rightAnswer: PropTypes.string,
  isButtonDisabled: PropTypes.bool,
}.isRequired;
