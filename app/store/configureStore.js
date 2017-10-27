import * as redux from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export const configure = (initialState = {}) => {
  const store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
