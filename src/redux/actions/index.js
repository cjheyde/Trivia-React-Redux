export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_PLAYER_EMAIL = 'SET_PLAYER_EMAIL';
export const TOKEN = 'TOKEN';
export const SET_PLAYER_SCORE = 'SET_PLAYER_SCORE';

export const savePlayerNameAction = (name) => ({
  type: SET_PLAYER_NAME,
  name,
});

export const savePlayerEmailAction = (gravatarEmail) => ({
  type: SET_PLAYER_EMAIL,
  gravatarEmail,
});

export const saveTokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const saveScoreAction = (score) => ({
  type: SET_PLAYER_SCORE,
  score,
});
