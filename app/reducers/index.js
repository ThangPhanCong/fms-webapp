import * as redux from 'redux';
import auth from './auth';

const testReducer = (state = {}, action) => {
  return state;
}

const reducer = redux.combineReducers({
  testReducer
});
export default reducer;
