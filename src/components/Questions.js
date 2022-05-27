import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsFromAPI from '../services/api';
import { savePlayerEmailAction, savePlayerNameAction } from '../redux/actions';
import './Questions.css';

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
    };
  }

  async componentDidMount() {
    const savedToken = localStorage.getItem('token');
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

  shuffleAnswers = () => {
    const { questionsArray, index } = this.state;
    const rightAnswer = questionsArray[index].correct_answer;
    const wrongAnswers = questionsArray[index].incorrect_answers;
    const allAnswers = [...wrongAnswers, rightAnswer];
    const LIMIT_VALUE = 0.5;
    const shuffledArray = allAnswers.sort(() => Math.random() - LIMIT_VALUE);
    return shuffledArray;
  }

  onClickAnswer = () => {
    this.setState({ okAnswer: true });
  }

  renderMultiple = () => {
    const shuffledAnswers = this.shuffleAnswers();
    const { rightAnswer, okAnswer } = this.state;

    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, mapIndex) => (
          answer === rightAnswer
            ? (
              <button
                id="correctAnswer"
                type="button"
                className={ okAnswer && 'correctAnswer' }
                data-testid="correct-answer"
                key={ `answerBtn${mapIndex}` }
                onClick={ this.onClickAnswer }

              >
                { answer }
              </button>
            )
            : (
              <button
                id="wrongAnswer"
                type="button"
                className={ okAnswer && 'wrongAnswer' }
                data-testid={ `wrong-answer-${mapIndex}` }
                key={ `answerBtn${mapIndex}` }
                onClick={ this.onClickAnswer }
              >
                { answer }
              </button>
            )
        )) }
      </div>);
  }

  shuffleBoolean = () => {
    const answers = ['True', 'False'];
    const LIMIT_VALUE = 0.5;
    const shuffledArray = answers.sort(() => Math.random() - LIMIT_VALUE);
    return shuffledArray;
  }

  renderBoolean = () => {
    const shuffledAnswers = this.shuffleBoolean();
    const { rightAnswer, okAnswer } = this.state;

    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, mapIndex) => (
          answer === rightAnswer
            ? (
              <button
                id="correctAnswer"
                className={ okAnswer && 'correctAnswer' }
                type="button"
                data-testid="correct-answer"
                key={ `answerBtn${mapIndex}` }
                onClick={ this.onClickAnswer }
              >
                { answer }
              </button>
            )
            : (
              <button
                id="wrongAnswer"
                type="button"
                className={ okAnswer && 'wrongAnswer' }
                data-testid="wrong-answer"
                key={ `answerBtn${mapIndex}` }
                onClick={ this.onClickAnswer }
              >
                { answer }
              </button>
            )
        )) }
      </div>);
  }

  changeQuestion = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      okAnswer: false,
    }), () => {
      this.changeState();
    });
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
    const { question, difficulty, category, type, index, isFetching } = this.state;
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

            { index <= MAX_INDEX_VALUE
              ? (
                <button
                  type="button"
                  onClick={ this.changeQuestion }
                >
                  Next
                </button>
              )
              : (
                <button
                  type="button"
                >
                  Feedback
                </button>
              ) }
          </main>
        )
    );
  }
}

Questions.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  savePlayerName: PropTypes.func.isRequired,
  savePlayerEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePlayerName: (name) => dispatch(savePlayerNameAction(name)),
  savePlayerEmail: (email) => dispatch(savePlayerEmailAction(email)),
});

const mapStateToProps = (state) => ({
  storeToken: state.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
