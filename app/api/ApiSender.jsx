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

exports.post = (route, payload) => {
  let cookie = new Cookie();
  let jwt = cookie.get('jwt');
  let url = `${BASE_URL}${route}?access_token=${jwt}`;

  return axios.post(url, payload);
};

exports.getWithoutAuth = (route) => {
  let url = BASE_URL + route;
  return axios.get(url);
};

// module.exports = {
//     getPages: function () {
//         var cookie = new Cookie;
//         let access_token = cookie.get('jwt');
//         var activePages = [];
//         var inactivePages = [];
//         if (access_token === undefined) {
//             console.log("No access_token!");
//             return [];
//         }
//         let requestUrl = `http://localhost:3001/api/pages?access_token=${access_token}`;
//         return axios.get(requestUrl).then(function (res) {
//             return res.data.data;
//         }, function (err) {
//             throw new Error(err);
//         });
//     },
//     activePage: function (pageid, updateComponent) {
//         var cookie = new Cookie;
//         let access_token = cookie.get('jwt');
//         if (access_token === undefined) {
//             console.log("No access_token!");
//             return;
//         }
//         let requestUrl = `http://localhost:3001/api/pages/${pageid}/active?access_token=${access_token}`;
//         return axios.post(requestUrl).then(function (res) {
//             if (res.data.err) {
//                 alert("Fail to active some pages. Please try again!");
//             }
//             updateComponent();
//             return res.data.msg;
//         }, function (err) {
//             alert("Fail to active some pages. Please try again!");
//         });
//     }
// };
