import { SET_PLAYER_NAME, SET_PLAYER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SET_PLAYER_EMAIL:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
