const apiSender = require('./ApiSender');

module.exports = {
    getProjectTags: (project_alias) => {
        let route = `/api/projects/${project_alias}/tags`;
        return apiSender.get(route);
    },
    createTagConversation: (alias, conversation_id, tag_id) => {
        let route = `/api/projects/${alias}/conversations/${conversation_id}/tags`;
        let payload = {tag_id: tag_id};
        return apiSender.post(route, payload);
    },
    deleteTagConversation: (alias, conversation_id, tag_id) => {
        let route = `/api/projects/${alias}/conversations/${conversation_id}/tags/${tag_id}`;
        return apiSender.delete(route);
    },
    create: (project_alias, tag_name, tag_color, tag_description) => {
        let route = `/api/projects/${project_alias}/tags`;
        let payload = {
            name: tag_name,
            color: tag_color,
            description: tag_description
        };
        return apiSender.post(route, payload);
    },
    remove: (project_alias, tag_id) => {
        let route = `/api/projects/${project_alias}/tags/${tag_id}`;
        return apiSender.delete(route);
    },
    update: (project_alias, tag_id, tag_name, tag_color, tag_description) => {
        let route = `/api/projects/${project_alias}/tags/${tag_id}`;
        let payload = {
            name: tag_name,
            color: tag_color,
            description: tag_description
        };
        return apiSender.put(route, payload);
    }
};
