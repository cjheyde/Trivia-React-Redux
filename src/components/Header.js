import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();
  // }

  // componentDidMount() {
  //   const emailGrava
  // }

  // getGravatar = async (gravatarEmail) => {
  //       const { gravatarEmailFromStore } = this.props;
  // const hashGerada = md5(gravatarEmailFromStore).toString();
  //   const URL = `https://www.gravatar.com/avatar/${hashGerada}`;
  //   const response = await fetch(URL);
  //   const result = await response.json();
  //   console.log(result);
  //   return result;
  // }

  render() {
    const { gravatarEmailFromStore, nameFromStore, scoreFromStore } = this.props;
    console.log(gravatarEmailFromStore, nameFromStore, scoreFromStore);
    const hashGerada = md5(gravatarEmailFromStore).toString();
    return (
      <div>
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
            {scoreFromStore}
          </div>
        </fieldset>
      </div>
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
}.isRequired;

export default connect(mapStateToProps, null)(Header);
