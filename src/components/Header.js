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
      <header>
        <div className="player-info">
          <img
            className="gravatar"
            src={ `https://www.gravatar.com/avatar/${hashGerada}` }
            alt="Imagem do jogador"
            data-testid="header-profile-picture"
          />
          <h2
            data-testid="header-player-name"
          >
            {nameFromStore}
          </h2>
        </div>
        <div
          data-testid="header-score"
          className="score"
        >
          {scoreFromStore}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  gravatarEmailFromStore: store.player.gravatarEmail,
  nameFromStore: store.player.name,
  scoreFromStore: store.player.score,
});

Header.propTypes = {
  gravatarEmailFromStore: propTypes.string,
  nameFromStore: propTypes.string,
  scoreFromStore: propTypes.number,
  dispatch: propTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
