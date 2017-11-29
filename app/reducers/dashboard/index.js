import * as redux from 'redux';
import conversations from './conversations';
import filters from './filters';
import chat from './chat';
import createOrder from './createOrder';

const dashboard = redux.combineReducers({
  conversations,
  chat,
  filters,
  createOrder
});

export default dashboard;