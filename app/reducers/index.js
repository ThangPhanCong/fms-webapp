import * as redux from 'redux';
import auth from './auth';
import project from './project';
import page from './page';
import post from './post';
import dashboard from './dashboard/index';
import setting from './setting/setting';

const reducers = redux.combineReducers({
  auth,
  project,
  page,
  post,
  dashboard,
  setting
});

export default reducers;
