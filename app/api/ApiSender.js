import * as store from '../helpers/storage';
import axios from 'axios';
import config from 'CONFIG';
import DashboardAPI from './DashboardApi';

const BASE_URL = config.BASE_URL;

exports.get = (route, access_token) => {
  let jwt = store.get('jwt');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token || jwt
  }

  return axios.get(url, {headers})
    .then(res => {
      if (!res.data) {
        throw new Error('Something went wrong');
      } else {
        if (res.data.err) {
          throw new Error(res.data.msg);
        } else {
          return Promise.resolve(res.data.data);
        }
      }
    });
};

exports.post = (route, payload) => {
  let jwt = store.get('jwt');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': jwt
  }

  return axios.post(url, payload, {headers})
    .then(res => {
      if (!res.data) {
        throw new Error('Something went wrong');
      } else {
        if (res.data.err) {
          throw new Error(res.data.msg);
        } else {
          return Promise.resolve(res.data.data);
        }
      }
    });
};

exports.put = (route, payload) => {
  let jwt = store.get('jwt');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': jwt
  }

  return axios.put(url, payload, {headers})
    .then(res => {
      if (!res.data) {
        throw new Error('Something went wrong');
      } else {
        if (res.data.err) {
          throw new Error(res.data.msg);
        } else {
          return Promise.resolve(res.data.data);
        }
      }
    });
};

exports.delete = (route, access_token) => {
  let jwt = store.get('jwt');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token || jwt
  }

  return axios.delete(url, {headers})
    .then(res => {
      if (!res.data) {
        throw new Error('Something went wrong');
      } else {
        if (res.data.err) {
          throw new Error(res.data.msg);
        } else {
          return Promise.resolve(res.data.data);
        }
      }
    });
};

exports.getWithoutAuth = (route) => {
  let url = BASE_URL + route;
  return axios.get(url);
};

exports.getGraphApi = (route, page_id) => {
  let url = `https://graph.facebook.com/v2.10` + route + `&access_token=`;
  let access_token = store.get(page_id);
  if (!access_token) {
    return DashboardAPI.getAccessToken(page_id)
      .then((res) => {
        url = url + res.access_token;
        store.set(page_id, res.access_token);
        return axios.get(url);
      })
  } else {
    url += access_token
    return axios.get(url);
  }
};
