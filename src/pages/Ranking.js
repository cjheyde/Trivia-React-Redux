import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const infoFromLS = JSON.parse(localStorage.getItem('ranking'));
    const sorted = infoFromLS.sort(({ score: a }, { score: b }) => b - a);
    console.log(sorted);

    return (
      <div className="ranking-list">
        <h1 data-testid="ranking-title">Ranking das pontuações</h1>
        <section>
          <ul>
            {
              sorted.map((playerInfo, index) => (
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

export default Ranking;
