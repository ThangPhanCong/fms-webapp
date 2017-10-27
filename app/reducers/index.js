import * as redux from 'redux';
import auth from './auth';

const reducers = redux.combineReducers({
  auth
});

export default reducers;
