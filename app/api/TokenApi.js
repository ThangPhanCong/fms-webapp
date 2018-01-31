import apiSender from './ApiSender';

exports.verifyAccessToken = (access_token) => {
  const route = `/api/a/tokens`;
  return apiSender.get(route, access_token);
};
