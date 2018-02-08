let apiSender = require('./ApiSender');

module.exports = {
    getSampleMessages: () => {
        let route = `/api/p/sample-messages`;
        return apiSender.get(route);
    },
    addSampleMessage: (message) => {
        let route = `/api/p/sample-messages`;
        return apiSender.post(route, {message})
    },
    deleteSampleMessage: (sample_id) => {
        let route = `/api/p/sample-messages/${sample_id}`;
        return apiSender.delete(route);
    }
};