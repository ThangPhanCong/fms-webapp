import apiSender from './ApiSender';

module.exports = {
    createNote: (alias, conv_id, customer_id, page_id, content) => {
        let route = `/api/p/conversations/${conv_id}/notes`;
        let payload = {
            customer_id: customer_id,
            page_id: page_id,
            content: content
        };
        return apiSender.post(route, payload);
    },
    getNotes: (alias, conv_id) => {
        let route = `/api/p/conversations/${conv_id}/notes`;
        return apiSender.get(route);
    },
    updateNote: (alias, conv_id, note_id, content) => {
        let route = `/api/p/conversations/${conv_id}/notes/${note_id}`;
        let payload = {content};
        return apiSender.put(route, payload);
    },
    deleteNote: (alias, conv_id, note_id) => {
        let route = `/api/p/conversations/${conv_id}/notes/${note_id}`;
        return apiSender.delete(route);
    }
};