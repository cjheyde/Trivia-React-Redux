import React, { Component } from 'react';
import logo from '../images/trivia.png';

export default class LogoTrivia extends Component {
  render() {
    return (
      <div>
        <img
          src={ logo }
          width="400px"
          alt="Logo do Jogo Trivia"
        />
      </div>
    );
  }
}
