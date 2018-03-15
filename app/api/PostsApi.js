let apiSender = require('./ApiSender');

module.exports = {
    getPostsOfPage: (page_id, next) => {
        let route = `/api/p/pages/${page_id}/posts`;
        if (next) route += `?next=${next}`;

        return apiSender.get(route);
    },
    getPostsOfProject: (next) => {
        let route = `/api/p/posts`;
        if (next) route += `?next=${next}`;

        return apiSender.get(route);
    },
    getPostInfo: (page_fb_id, post_id) => {
        let route = `/api/p/pages/${page_fb_id}/posts/${post_id}`;
        return apiSender.get(route);
    },
    hideComment: (post_id, hide) => {
        let route = `/api/p/posts/${post_id}`;
        let payload = {hide_comment: hide};
        return apiSender.put(route, payload);
    },
    hidePhoneComment: (post_id, hide) => {
        let route = `/api/p/posts/${post_id}`;
        let payload = {hide_phone: hide};
        return apiSender.put(route, payload);
    },
    updateExpiredAttachmentPost: (post_id) => {
        let route = `/api/p/posts/${post_id}`;
        let payload = {attachments: true};
        return apiSender.put(route, payload);
    },
    addNewPost: (fb_ids, content) => {
        let route = `/api/p/pages/posts`;
        let payload = {page_fb_ids: fb_ids, content: content};
        return apiSender.post(route, payload);
    }
};
