import {BASE_URL, REDIRECT_TO} from 'CONFIG';
import * as store from '../helpers/storage';
import tokenApi from '../api/TokenApi';

export const VERIFY_ACCESS_TOKEN_LOADING = 'VERIFY_ACCESS_TOKEN_LOADING';
export const VERIFY_ACCESS_TOKEN_LOADED = 'VERIFY_ACCESS_TOKEN_LOADED';
export const LOG_OUT = 'LOG_OUT';

export const logIn = () => () => {
  window.location = `${BASE_URL}/api/fb/oauth?redirect_to=${REDIRECT_TO}`;
};

export const logOut = () => dispatch => {
  store.clearAll();
  dispatch({type: LOG_OUT});
};

export const verifyAccessToken = (access_token) => (dispatch) => {
  if (!access_token) {
    access_token = store.get('access_token');
  } else {
    store.set('access_token', access_token);
  }

  dispatch({type: VERIFY_ACCESS_TOKEN_LOADING});

  tokenApi.verifyAccessToken(access_token)
    .then(userData => {
      dispatch({
        type: VERIFY_ACCESS_TOKEN_LOADED,
        isAuthenticated: true,
        user: userData
      });

      // socket.connect(access_token);
    })
    .catch(() => {
      store.clearAll();
      dispatch({
        type: VERIFY_ACCESS_TOKEN_LOADED,
        isAuthenticated: false,
        user: null
      });
    })
};
