import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      difficultyValue: ['3', '2', '1'],
      timer: 30,
      scorePoints: 0,
    };
  }

  myScore = () => {
    const { difficulty } = this.props;
    const { difficultyValue, timer, scorePoints } = this.state;
    const constantValue = 10;

    if (difficulty === 'hard') {
      const playerScore = constantValue + (timer * Number(difficultyValue[0]));
      this.setState((prevState) => (
        { scorePoints: [...prevState.scorePoints + playerScore] }));
      localStorage.setItem('score', JSON.stringify(scorePoints));
      return scorePoints;
    }

    if (difficulty === 'medium') {
      const playerScore = constantValue + (timer * Number(difficultyValue[1]));
      this.setState((prevState) => (
        { scorePoints: [...prevState.scorePoints + playerScore] }));
      localStorage.setItem('score', JSON.stringify(scorePoints));
      return scorePoints;
    }

    if (difficulty === 'easy') {
      const playerScore = constantValue + (timer * Number(difficultyValue[2]));
      this.setState((prevState) => (
        { scorePoints: [...prevState.scorePoints + playerScore] }));
      localStorage.setItem('score', JSON.stringify(scorePoints));
      return scorePoints;
    }
  }

  render() {
    const { gravatarEmailFromStore, nameFromStore, scoreFromStore } = this.props;
    // console.log(gravatarEmailFromStore, nameFromStore, scoreFromStore);
    const hashGerada = md5(gravatarEmailFromStore).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashGerada}` }
          alt="Imagem do jogador"
          data-testid="header-profile-picture"
        />

        <h2
          data-testid="header-player-name"
        >
          {nameFromStore}
        </h2>

        <fieldset>
          <div
            data-testid="header-score"
          >
            {this.myScore}
          </div>
        </fieldset>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  gravatarEmailFromStore: store.player.gravatarEmail,
  nameFromStore: store.player.name,
  scoreFromStore: store.player.score,
  difficulty: store.player.difficulty,
});

Header.propTypes = {
  gravatarEmailFromStore: propTypes.string,
  nameFromStore: propTypes.string,
  scoreFromStore: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
