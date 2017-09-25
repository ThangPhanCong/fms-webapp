'use strict';

import apiSender from 'ApiSender';

exports.verifyAccessToken = (access_token) => {
  const route = `/api/token`;
  return apiSender.get(route, access_token);
}
