const INITIAL_STATE = {};

const triviaAPI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'QUESTIONS_API':
    return action.apiResponse;
  default:
    return state;
  }
};

export default triviaAPI;
