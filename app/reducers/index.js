import * as redux from 'redux';
import project from './project';
import page from './page';
import dashboard from './dashboard/index';

const reducers = redux.combineReducers({
  project,
  page,
  dashboard
});

export default reducers;
