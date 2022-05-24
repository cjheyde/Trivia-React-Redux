const INITIAL_STATE = {
  ranking: [
    { name: '', score: 0, picture: '' },
  ],
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN':
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default token;
