export const saveTokenAction = (token) => ({ type: 'TOKEN', token });

export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_PLAYER_EMAIL = 'SET_PLAYER_EMAIL';

export const savePlayerNameAction = (name) => ({
  type: SET_PLAYER_NAME,
  name,
});

export const savePlayerEmailAction = (gravatarEmail) => ({
  type: SET_PLAYER_EMAIL,
  gravatarEmail,
});
