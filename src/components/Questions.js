import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import getQuestionsFromAPI from '../services/api';
// import { savePlayerEmailAction, savePlayerNameAction } from '../redux/actions';s

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: {},
      index: 0,
      difficulty: '',
      question: '',
      category: '',
      type: '',
      rightAnswer: '',
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestionsFromAPI(token);
    // const INVALID_CODE = 3;
    // const { history, savePlayerEmail, savePlayerName } = this.props;
    // if (questions.response_code === INVALID_CODE) {
    //   localStorage.setItem('token', '');
    //   savePlayerEmail('');
    //   savePlayerName('');
    //   // history.push('/');
    //   // return <Redirect to="/" />;
    // }
    this.setState({
      questionsArray: questions.results,
      difficulty: questions.results[0].difficulty,
      question: questions.results[0].question,
      category: questions.results[0].category,
      type: questions.results[0].type,
      rightAnswer: questions.results[0].correct_answer,
    });
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

  renderMultiple = () => {
    const shuffledAnswers = this.shuffleAnswers();
    const { rightAnswer } = this.state;

    return (
      <div>
        { shuffledAnswers.map((answer, index) => (
          answer === rightAnswer
            ? (
              <button
                type="button"
                data-testid="correct-answer"
                key={ `answerBtn${index}` }
              >
                { answer }
              </button>
            )
            : (
              <button
                type="button"
                data-testid={ `wrong-answer-${index}` }
                key={ `answerBtn${index}` }
              >
                { answer }
              </button>
            )
        )) }
      </div>);
  }

  renderBoolean = () => {
    const { rightAnswer } = this.state;

    return (
      rightAnswer
        ? (
          <div>
            <button
              type="button"
              data-testid="correct-answer"
            >
              True
            </button>
            <button
              type="button"
              data-testid="wrong-answer-0"
            >
              False
            </button>
          </div>
        )
        : (
          <div>
            <button
              type="button"
              data-testid="wrong-answer-0"
            >
              True
            </button>
            <button
              type="button"
              data-testid="correct-answer"
            >
              False
            </button>
          </div>
        )
    );
  }

  changeQuestion = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }), () => {
      this.changeState();
    });
  }

  changeState = () => {
    const { index, questions } = this.state;
    this.setState({
      difficulty: questions.results[index].difficulty,
      question: questions.results[index].question,
      category: questions.results[index].category,
      type: questions.results[index].type,
      rightAnswer: questions.results[index].correct_answer,
    });
  }

  render() {
    const { question, difficulty, category, type, index } = this.state;
    const MAX_INDEX_VALUE = 4;
    return (
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
    );
  }
}

// Questions.propTypes = {
//   history: PropTypes.objectOf(PropTypes.any).isRequired,
//   savePlayerName: PropTypes.func.isRequired,
//   savePlayerEmail: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   savePlayerName: (name) => dispatch(savePlayerNameAction(name)),
//   savePlayerEmail: (email) => dispatch(savePlayerEmailAction(email)),
// });

// export default connect(null, mapDispatchToProps)(Questions);
export default Questions;
