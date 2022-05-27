import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { gravatarEmailFromStore, nameFromStore, scoreFromStore } = this.props;
    const hashGerada = md5(gravatarEmailFromStore).toString();
    return (
      <div className="loginData">
        <img
          src={ `https://www.gravatar.com/avatar/${hashGerada}` }
          alt="Imagem do jogador"
          data-testid="header-profile-picture"
        />
        <h2
          data-testid="header-player-name"
        >
          Jogador:
          {' '}
          {nameFromStore}
        </h2>

        <label htmlFor="score">
          Pontos:
          {' '}
          <input
            type="text"
            value={ scoreFromStore }
            name="score"
            id="score"
            data-testid="header-score"
            className="score"
          />
        </label>
      </div>
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
