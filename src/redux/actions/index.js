export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_PLAYER_EMAIL = 'SET_PLAYER_EMAIL';
export const TOKEN = 'TOKEN';
export const SET_TIME_ANSWER = 'SET_TIME_ANSWER';

export const savePlayerNameAct = (name) => ({
  type: SET_PLAYER_NAME,
  name,
});

export const savePlayerEmailAct = (gravatarEmail) => ({
  type: SET_PLAYER_EMAIL,
  gravatarEmail,
});

export const saveTokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const saveTimeAct = (secondsToStore) => ({
  type: SET_TIME_ANSWER,
  secondsToStore,
});
