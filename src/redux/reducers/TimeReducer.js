import { SET_TIME_ANSWER } from '../actions/index';

const INITIAL_STATE = {
  secondsToStore: '',
};

const time = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIME_ANSWER:
    return action.secondsToStore;
  default:
    return state;
  }
};

export default time;
