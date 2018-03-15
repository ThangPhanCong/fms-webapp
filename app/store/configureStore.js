import * as redux from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

export const configure = (initialState = {}) => {
  let middlewareWrapper;
  if (process.env.NODE_ENV !== 'production') {
    middlewareWrapper = redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  } else {
    middlewareWrapper = redux.compose(redux.applyMiddleware(thunk))
  }
  const store = redux.createStore(reducers, initialState, middlewareWrapper);

  return store;
};
