import * as redux from 'redux';
import auth from './auth';
import project from './project/index';
import post from './post';

const reducers = redux.combineReducers({
  auth,
  project,
  post
});

export default reducers;
