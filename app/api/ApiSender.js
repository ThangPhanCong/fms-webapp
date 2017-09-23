'use strict';

import store from 'store';
const axios = require('axios');
const config = require('CONFIG');

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

exports.getWithoutAuth = (route) => {
  let url = BASE_URL + route;
  return axios.get(url);
};