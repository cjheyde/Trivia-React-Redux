import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class MultipleBtn extends Component {
  shuffleAnswers = () => {
    const { questionsArray, index } = this.props;
    const rightAnswer = questionsArray[index].correct_answer;
    const wrongAnswers = questionsArray[index].incorrect_answers;
    const allAnswers = [...wrongAnswers, rightAnswer];
    const LIMIT_VALUE = 0.5;
    const shuffledArray = allAnswers.sort(() => Math.random() - LIMIT_VALUE);
    const { difficulty } = this.props;
    localStorage.setItem('difficulty', difficulty);
    return shuffledArray;
  }

  render() {
    const { isButtonDisabled, okAnswer, rightAnswer, onClickAnswer } = this.props;
    const shuffledAnswers = this.shuffleAnswers();
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

MultipleBtn.propTypes = {
  onClickAnswer: PropTypes.func,
  okAnswer: PropTypes.bool,
  rightAnswer: PropTypes.string,
  isButtonDisabled: PropTypes.bool,
}.isRequired;
