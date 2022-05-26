import { combineReducers } from 'redux';
import player from './PlayerReducer';
import token from './TokenReducer';

const rootReducer = combineReducers({ player, token });

export default rootReducer;
