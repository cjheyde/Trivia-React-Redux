import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { playerRanking } = this.props;
    const arrayPlayerInfo = Object.keys(playerRanking);

    // console.log(arrayPlayerInfo);
    return (
      <div>
        <h1>Ranking das pontuações</h1>
        <section>
          <ul>
            {
              arrayPlayerInfo.map((playerInfo, index) => (
                <li key={ index }>
                  <img src={ playerInfo.picture } alt="img-player" />
                  <p data-testid={ `player-name-${index}` }>{playerInfo.name}</p>
                  <p data-testid={ `player-score-${index}` }>{playerInfo.score}</p>
                </li>
              ))
            }
          </ul>
        </section>
        <Link to="/">
          <button
            type="button"
            name="home-button"
            data-testid="btn-go-home"
          >
            Voltar ao inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  playerRanking: store.player,
});

Ranking.propTypes = {
  playerRanking: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
