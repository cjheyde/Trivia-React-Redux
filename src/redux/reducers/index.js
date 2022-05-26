import { combineReducers } from 'redux';
import player from './PlayerReducer';

const rootReducer = combineReducers({ player });

export default rootReducer;
