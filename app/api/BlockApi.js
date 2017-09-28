'use strict';

const apiSender = require('ApiSender');

module.exports = {
  blockCustomer: (page_fb_id, user_fb_id) => {
    let route = `/api/pages/${page_fb_id}/block`;
    let payload = {
      user_id: user_fb_id
    }

    return apiSender.post(route, payload);
  },
  activeCustomer: (page_fb_id, user_fb_id) => {
    let route = `/api/pages/${page_fb_id}/unblock`;
    let payload = {
      user_id: user_fb_id
    }

    return apiSender.post(route, payload);
  }
};
