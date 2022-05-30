import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { buttonId, buttonClass, answerRorW, buttonKey, onClickFunction,
      answer, isButtonDisabled } = this.props;
    return (
      <button
        id={ buttonId }
        type="button"
        className={ buttonClass }
        disabled={ isButtonDisabled }
        data-testid={ answerRorW }
        key={ buttonKey }
        onClick={ onClickFunction }

      >
        {answer}
      </button>
    );
  }
}

Button.propTypes = {
  buttonId: PropTypes.string,
  buttonClass: PropTypes.func,
  answerRorW: PropTypes.string,
  buttonKey: PropTypes.func,
  onClickFunction: PropTypes.func,
  answer: PropTypes.string,
}.isRequired;
