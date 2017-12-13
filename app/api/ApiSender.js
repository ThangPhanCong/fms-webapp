import * as store from '../helpers/storage';
import axios from 'axios';
import {BASE_URL} from 'CONFIG';

exports.get = (route, access_token) => {
  if (!access_token) {
    access_token = store.get('access_token');
  }
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token
  };

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
  let access_token = store.get('access_token');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token
  };

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
  let access_token = store.get('access_token');
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token
  };

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
  if (!access_token) {
    access_token = store.get('access_token');
  }
  let url = `${BASE_URL}${route}`;
  let headers = {
    'authorization': access_token || access_token
  };

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
