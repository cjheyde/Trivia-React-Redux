import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsFromAPI from '../services/api';
import { myScore, invalidCode, shuffleBoolean } from './Functions';
import { savePlayerEmailAction, savePlayerNameAction,
  savePlayerAssertionAction, saveScoreAction } from '../redux/actions';
import '../css/Questions.css';
import Feedback from '../pages/Feedback';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      index: 0,
      difficulty: '',
      question: '',
      category: '',
      type: '',
      rightAnswer: '',
      isFetching: false,
      okAnswer: false,
      nextButton: false,
      scorePlayer: 0,
      assertionsToStore: 1,
    };
  }

  async componentDidMount() {
    const savedToken = localStorage.getItem('token');
    const { startTimer, history, savePlayerEmail, savePlayerName } = this.props;
    this.setState({ isFetching: true }, async () => {
      const questions = await getQuestionsFromAPI(savedToken);
      const INVALID_CODE = 3;
      if (questions.response_code === INVALID_CODE) {
        invalidCode(history, savePlayerEmail, savePlayerName);
      } else {
        this.setState({
          questionsArray: questions.results,
          difficulty: questions.results[0].difficulty,
          question: questions.results[0].question,
          category: questions.results[0].category,
          type: questions.results[0].type,
          rightAnswer: questions.results[0].correct_answer,
          isFetching: false,
        });
        startTimer();
      }
    });
  }

  shuffleAnswers = () => {
    const { questionsArray, index } = this.state;
    const rightAnswer = questionsArray[index].correct_answer;
    const wrongAnswers = questionsArray[index].incorrect_answers;
    const allAnswers = [...wrongAnswers, rightAnswer];
    const LIMIT_VALUE = 0.5;
    const shuffledArray = allAnswers.sort(() => Math.random() - LIMIT_VALUE);
    const { difficulty } = this.state;
    localStorage.setItem('difficulty', difficulty);
    return shuffledArray;
  }

  onClickAnswer = ({ target }) => {
    const { scorePlayer, rightAnswer, assertionsToStore } = this.state;
    const { saveScore, savePlayerAssertion, stopTimer, saveTimeToStore } = this.props;
    const score = rightAnswer === target.value ? myScore() : 0;
    this.setState((prevState) => ({ okAnswer: true,
      scorePlayer: prevState.scorePlayer + score,
      nextButton: true }), () => { saveScore(scorePlayer); });
    if (target.id === 'correctAnswer') {
      savePlayerAssertion(assertionsToStore);
      this.setState({ assertionsToStore: assertionsToStore + 1 });
    }
    saveTimeToStore();
    stopTimer();
  }

  renderMultiple = () => {
    const shuffledAnswers = this.shuffleAnswers();
    const { rightAnswer, okAnswer } = this.state;
    const { isButtonDisabled } = this.props;
    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, mapIndex) => (answer === rightAnswer
          ? (
            <button
              id="correctAnswer"
              type="button"
              value={ answer }
              className={ okAnswer && 'correctAnswer' }
              data-testid="correct-answer"
              key={ `answerBtn${mapIndex}` }
              onClick={ this.onClickAnswer }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          )
          : (
            <button
              id="wrongAnswer"
              type="button"
              value={ answer }
              className={ okAnswer && 'wrongAnswer' }
              data-testid={ `wrong-answer-${mapIndex}` }
              key={ `answerBtn${mapIndex}` }
              onClick={ this.onClickAnswer }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          )
        )) }
      </div>);
  }

  renderBoolean = () => {
    const shuffledAnswers = shuffleBoolean();
    const { rightAnswer, okAnswer } = this.state;
    const { isButtonDisabled } = this.props;
    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, mapIndex) => (answer === rightAnswer
          ? (
            <button
              id="correctAnswer"
              className={ okAnswer && 'correctAnswer' }
              value={ answer }
              type="button"
              data-testid="correct-answer"
              key={ `answerBtn${mapIndex}` }
              onClick={ this.onClickAnswer }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          )
          : (
            <button
              id="wrongAnswer"
              value={ answer }
              type="button"
              className={ okAnswer && 'wrongAnswer' }
              data-testid="wrong-answer"
              key={ `answerBtn${mapIndex}` }
              onClick={ this.onClickAnswer }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          )
        )) }
      </div>);
  }

  changeQuestion = () => {
    const { history } = this.props;
    const { index } = this.state;
    const FOUR = 4;
    this.setState((prevState) => ({ index: prevState.index + 1,
      okAnswer: false,
      nextButton: false,
    }), () => { this.changeState(); });
    if (index === FOUR) { history.push('/feedback'); }
  }

  changeState = () => {
    const { index, questionsArray } = this.state;
    this.setState({
      difficulty: questionsArray[index].difficulty,
      question: questionsArray[index].question,
      category: questionsArray[index].category,
      type: questionsArray[index].type,
      rightAnswer: questionsArray[index].correct_answer,
    });
  }

  render() {
    const { question, difficulty, category, type, index, isFetching,
      nextButton } = this.state;
    const { seconds } = this.props;
    const MAX_INDEX_VALUE = 4;
    return (
      isFetching ? <h1>Loading</h1>
        : (
          <main>
            <h4>{ `Difficulty: ${difficulty}` }</h4>
            <h4 data-testid="question-category">{ `Category: ${category}` }</h4>
            <h3 data-testid="question-text">{ question }</h3>
            { type === 'multiple'
              ? this.renderMultiple()
              : this.renderBoolean() }
            <div>
              Tempo:
              {' '}
              {seconds}
            </div>
            { index <= MAX_INDEX_VALUE && nextButton
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.changeQuestion }
                >
                  Próximo
                </button>)}
            { index > MAX_INDEX_VALUE && (<Feedback />)}
          </main>
        )
    );
  }
}

Questions.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  savePlayerName: PropTypes.func.isRequired,
  savePlayerEmail: PropTypes.func.isRequired,
  savePlayerAssertion: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  stopTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  saveTimeToStore: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePlayerName: (name) => dispatch(savePlayerNameAction(name)),
  savePlayerEmail: (email) => dispatch(savePlayerEmailAction(email)),
  saveScore: (score) => dispatch(saveScoreAction(score)),
  savePlayerAssertion: (assertions) => dispatch(savePlayerAssertionAction(assertions)),
});

const mapStateToProps = (state) => ({
  storeToken: state.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
