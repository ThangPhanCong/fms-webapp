import config from 'CONFIG';
import * as store from '../helpers/storage';
import tokenApi from '../api/TokenApi';

export const VERIFY_ACCESS_TOKEN_LOADING = 'VERIFY_ACCESS_TOKEN_LOADING';
export const VERIFY_ACCESS_TOKEN_LOADED = 'VERIFY_ACCESS_TOKEN_LOADED';
export const LOG_OUT = 'LOG_OUT';

export const logIn = () => dispatch => {
  let oauthLink = `${config.BASE_URL}/api/fb/oauth?redirect_to=${config.REDIRECT_TO}`;

  window.location = oauthLink;
}

export const logOut = () => dispatch => {
  store.clearAll();
  dispatch({type: LOG_OUT});
}

export const verifyAccessToken = (access_token) => (dispatch, getState) => {
  if (!access_token) {
    access_token = store.get('jwt');
  } else {
    console.log('access_token', access_token);
    // store.set('jwt', access_token);
  }

  debugger;

  dispatch({type: VERIFY_ACCESS_TOKEN_LOADING});

  tokenApi.verifyAccessToken(access_token)
    .then(userData => {
      dispatch({
        type: VERIFY_ACCESS_TOKEN_LOADED,
        isAuthenticated: true,
        user: userData
      });
    })
    .catch(err => {
      store.clearAll();
      dispatch({
        type: VERIFY_ACCESS_TOKEN_LOADED,
        isAuthenticated: false,
        user: null
      });
    })
}
