import apiSender from './ApiSender';

module.exports = {
    updateGeneralInfo: (user_id, payload) => {
        return apiSender.put(`/api/a/staffs/${user_id}`, payload);
    },
    updatePassword: (user_id, payload) => {
        return apiSender.put(`/api/a/staffs/${user_id}/password`, payload);
    }
};