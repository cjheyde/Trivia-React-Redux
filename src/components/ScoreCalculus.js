import React, { Component } from 'react';

export default class ScoreCalculus extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     difficultyValue: ['3', '2', '1'],
  //     timer: 30,
  //   };
  // }

  // myScore = () => {
  //   const { difficulty, scoreFromStore } = this.props;
  //   const { difficultyValue, timer } = this.state;
  //   const constantValue = 10;

  //   if (difficulty === 'hard') {
  //     const playerScore = constantValue + (timer * Number(difficultyValue[0]));
  //     this.setState((prevState) => (
  //       { scoreFromStore: [...prevState.scorePoints + playerScore] }));
  //     localStorage.setItem('score', JSON.stringify(scorePoints));
  //     return scorePoints;
  //   }

  //   if (difficulty === 'medium') {
  //     const playerScore = constantValue + (timer * Number(difficultyValue[1]));
  //     this.setState((prevState) => (
  //       { scorePoints: [...prevState.scorePoints + playerScore] }));
  //     localStorage.setItem('score', JSON.stringify(scorePoints));
  //     return scorePoints;
  //   }

  //   if (difficulty === 'easy') {
  //     const playerScore = constantValue + (timer * Number(difficultyValue[2]));
  //     this.setState((prevState) => (
  //       { scorePoints: [...prevState.scorePoints + playerScore] }));
  //     localStorage.setItem('score', JSON.stringify(scorePoints));
  //     return scorePoints;
  //   }
  // }
  render() {
    return (
      <div>ScoreCalculus</div>
    );
  }
}
