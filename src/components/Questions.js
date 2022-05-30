import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsFromAPI from '../services/api';
import myScore from './Score';
import { savePlayerEmailAction, savePlayerNameAction,
  savePlayerAssertionAction, saveScoreAction } from '../redux/actions';
import '../css/Questions.css';
import Feedback from '../pages/Feedback';
import BooleanBtn from './BooleanBtn';
import MultipleBtn from './MultipleBtn';

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
    const { startTimer } = this.props;
    this.setState({
      isFetching: true,
    }, async () => {
      const questions = await getQuestionsFromAPI(savedToken);
      const INVALID_CODE = 3;
      if (questions.response_code === INVALID_CODE) {
        this.invalidCode();
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

  invalidCode = () => {
    const { history, savePlayerEmail, savePlayerName } = this.props;
    localStorage.setItem('token', '');
    savePlayerEmail('');
    savePlayerName('');
    history.push('/');
  }

  onClickAnswer = ({ target }) => {
    const { scorePlayer, rightAnswer, assertionsToStore } = this.state;
    const { saveScore, savePlayerAssertion, stopTimer, saveTimeToStore } = this.props;
    const score = rightAnswer === target.value ? myScore() : 0;
    this.setState((prevState) => ({
      okAnswer: true,
      scorePlayer: prevState.scorePlayer + score,
      nextButton: true }), () => {
      saveScore(scorePlayer);
    });
    if (target.id === 'correctAnswer') {
      savePlayerAssertion(assertionsToStore);
      this.setState({ assertionsToStore: assertionsToStore + 1 });
    }
    saveTimeToStore();
    stopTimer();
  }

  changeQuestion = () => {
    const { history } = this.props;
    const { index } = this.state;
    const FOUR = 4;
    this.setState((prevState) => ({
      index: prevState.index + 1,
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
      nextButton, rightAnswer, okAnswer, questionsArray } = this.state;
    const { seconds, isButtonDisabled } = this.props;
    const MAX_INDEX_VALUE = 4;
    return (
      isFetching ? <h1>Loading</h1>
        : (
          <main>
            <h4>{ `Difficulty: ${difficulty}` }</h4>
            <h4 data-testid="question-category">{ `Category: ${category}` }</h4>
            <h3 data-testid="question-text">{ question }</h3>
            { type === 'multiple'
              ? (
                <MultipleBtn
                  isButtonDisabled={ isButtonDisabled }
                  okAnswer={ okAnswer }
                  rightAnswer={ rightAnswer }
                  onClickAnswer={ this.onClickAnswer }
                  questionsArray={ questionsArray }
                  index={ index }
                  difficulty={ difficulty }
                />)
              : (
                <BooleanBtn
                  isButtonDisabled={ isButtonDisabled }
                  okAnswer={ okAnswer }
                  rightAnswer={ rightAnswer }
                  onClickAnswer={ this.onClickAnswer }
                />)}
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
                </button>
              )}
            { index > MAX_INDEX_VALUE
              && (<Feedback />)}
          </main>
        )
    );
  }
}

Questions.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  savePlayerName: PropTypes.func.isRequired,
  savePlayerEmail: PropTypes.func.isRequired,
  savePlayerAssertion: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
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
