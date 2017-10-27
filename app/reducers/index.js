import * as redux from 'redux';
import auth from './auth';
import project from './project';

const reducers = redux.combineReducers({
  auth,
  project
});

export default reducers;
