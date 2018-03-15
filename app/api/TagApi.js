const apiSender = require('./ApiSender');

module.exports = {
    getProjectTags: () => {
        let route = `/api/p/tags`;
        return apiSender.get(route);
    },
    createTagConversation: (conversation_id, tag_id) => {
        let route = `/api/p/conversations/${conversation_id}/tags`;
        let payload = {tag_id: tag_id};
        return apiSender.post(route, payload);
    },
    deleteTagConversation: (alias, conversation_id, tag_id) => {
        let route = `/api/p/conversations/${conversation_id}/tags/${tag_id}`;
        return apiSender.delete(route);
    },
    create: (tag_name, tag_color, tag_description) => {
        let route = `/api/p/tags`;
        let payload = {
            name: tag_name,
            color: tag_color,
            description: tag_description
        };
        return apiSender.post(route, payload);
    },
    remove: (tag_id) => {
        let route = `/api/p/tags/${tag_id}`;
        return apiSender.delete(route);
    },
    update: (tag_id, tag_name, tag_color, tag_description) => {
        let route = `/api/p/tags/${tag_id}`;
        let payload = {
            name: tag_name,
            color: tag_color,
            description: tag_description
        };
        return apiSender.put(route, payload);
    }
};
