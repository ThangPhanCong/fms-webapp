const apiSender = require('./ApiSender');

module.exports = {
    sendForgetPasswordReq: (payload) => {
        return apiSender.postWithoutAuth(`/api/a/staff-forget-password`, payload);
    },
    sendResetPasswordReq: (token, payload) => {
        return apiSender.post(`/api/a/staff-reset-password`, payload, token);
    },
};