'use strict';

const Cookie = require('universal-cookie');
let apiSender = require('ApiSender');

module.exports = {
  getPosts: function() {
    let page_id = '698047147071892';
    let route = `/api/pages/${page_id}/posts`;

    return apiSender.get(route);
  }
};
