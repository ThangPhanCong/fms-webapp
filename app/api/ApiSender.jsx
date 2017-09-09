'use strict';

const Cookie = require('universal-cookie');
const axios = require('axios');
const config = require('config');

const BASE_URL = config.BASE_URL;

exports.get = (route) => {
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
  let url = `${BASE_URL}${route}?access_token=${jwt}`;

  return axios.get(url)
      .then(
        res => {
          return Promise.resolve(res.data.data);
        },
        err => {
          alert(err);
        }
      );
};

exports.post = (route, payload) => {
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
  let url = `${BASE_URL}${route}?access_token=${jwt}`;

  return axios.post(url, payload)
    .then(
      res => {
        return Promise.resolve(res.data.data);
      },
      err => {
        alert(err);
      }
    );
};

exports.getWithoutAuth = (route) => {
  let url = BASE_URL + route;
  return axios.get(url);
};
