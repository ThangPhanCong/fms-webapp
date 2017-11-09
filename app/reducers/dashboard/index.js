import * as redux from 'redux';
import conversations from './conversations';
import filters from './filters';
import selectedConversation from './selectedConversation/chatArea';

const dashboard = redux.combineReducers({
  conversations,
  selectedConversation,
  filters
});

export default dashboard;