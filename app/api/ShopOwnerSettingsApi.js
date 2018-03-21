import apiSender from './ApiSender';

module.exports = {
    updateGeneralInfo: (user_id, payload) => {
        return apiSender.put(`/api/a/users/${user_id}`, payload);
    },
    updatePassword: (user_id, payload) => {
        return apiSender.put(`/api/a/users/${user_id}/password`, payload);
    }
};