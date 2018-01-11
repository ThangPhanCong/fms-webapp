import * as redux from 'redux';
import auth from './auth';
import project from './project';
import page from './page';
import dashboard from './dashboard/index';

const reducers = redux.combineReducers({
  auth,
  project,
  page,
  dashboard
});

export default reducers;
