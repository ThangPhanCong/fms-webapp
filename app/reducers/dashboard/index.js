import * as redux from 'redux';
import conversations from './conversations';
import filters from './filters';
import chat from './chat';

const dashboard = redux.combineReducers({
  conversations,
  chat,
  filters
});

export default dashboard;