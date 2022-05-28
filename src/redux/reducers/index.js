import { combineReducers } from 'redux';
import player from './PlayerReducer';
import token from './TokenReducer';
import time from './TimeReducer';

const rootReducer = combineReducers({ player, token, time });

export default rootReducer;
