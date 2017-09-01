'use strict';

const Cookie = require('universal-cookie');
const axios = require('axios');
const BASE_URL = 'http://localhost:3001';

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

// todo: use promise instead of callback
exports.post = (route, callback, payload) => {
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
  let url = `${BASE_URL}${route}?access_token=${jwt}`;
  return axios.post(url, payload).then((res) => {
    if (callback) callback();
  }, (err) => {
    alert(err);
  });
};

exports.getWithoutAuth = (route) => {
  let url = BASE_URL + route;
  return axios.get(url);
};
