let apiSender = require('./ApiSender');

module.exports = {
  getPostsOfPage: (page_id, next) => {
    let route = `/api/pages/${page_id}/posts`;
    if (next) route += `?next=${next}`;

    return apiSender.get(route);
  },
  getPostsOfProject: (project_alias, next) => {
    let route = `/api/projects/${project_alias}/posts`;
    if (next) route += `?next=${next}`;

    return apiSender.get(route);
  },
  getPostInfo: (page_fb_id, post_id) => {
    let route = `/api/pages/${page_fb_id}/posts/${post_id}`;
    return apiSender.get(route);
  },
  hideComment: (post_id, hide) => {
    let route = `/api/posts/${post_id}`;
    let payload = { hide_comment: hide };
    return apiSender.put(route, payload);
  },
  updateExpiredAttachmentPost: (post_id) => {
    let route = `/api/posts/${post_id}`;
    let payload = {attachments: true};
    return apiSender.put(route, payload);
  }
};
