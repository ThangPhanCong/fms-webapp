'use strict';

const Cookie = require('universal-cookie');
const axios = require('axios');
const config = require('config');

const BASE_URL = config.BASE_URL;

exports.get = (route, access_token) => {
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
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
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
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
