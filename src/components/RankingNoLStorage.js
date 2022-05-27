import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class RankingNoLStorage extends Component {
  // componentDidMount() {
  //   this.setRankingByPlayer();
  // }

  setRankingByPlayer = () => {
    const { nameFromStore, scoreFromStore, gravatarEmailFromStore } = this.props;
    const hashGerada = md5(gravatarEmailFromStore).toString();
    const ranks = JSON.parse(localStorage.getItem('ranking'));
    const playerRank = { name: nameFromStore, score: scoreFromStore, picture: `https://www.gravatar.com/avatar/${hashGerada}` };
    if (ranks) {
      localStorage.setItem('ranking', JSON.stringify([...ranks, playerRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerRank]));
    }
  }

  render() {
    return (
      <div>RankingNoLStorage</div>
    );
  }
}

const mapStateToProps = (store) => ({
  gravatarEmailFromStore: store.player.gravatarEmail,
  nameFromStore: store.player.name,
  scoreFromStore: store.player.score,
});

RankingNoLStorage.propTypes = {
  gravatarEmailFromStore: propTypes.string,
  nameFromStore: propTypes.string,
  scoreFromStore: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(RankingNoLStorage);
