import * as redux from 'redux';
import auth from './auth';
import project from './project';
import post from './post';
import setting from './setting';

const reducers = redux.combineReducers({
  auth,
  project,
  post,
  setting
});

export default reducers;
