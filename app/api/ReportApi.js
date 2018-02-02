let apiSender = require('./ApiSender');

module.exports = {
    createReport: (page_fb_id, customer_id, content) => {
        let route = `/api/p/customers/${customer_id}/bad-reports`;
        let payload = {
            page_fb_id,
            content: content
        };
        return apiSender.post(route, payload);
    },
    getReports: (customer_id) => {
        let route = `/api/p/customers/${customer_id}/bad-reports`;
        return apiSender.get(route);
    },
    updateReport: (customer_id, report_id, content) => {
        let route = `/api/p/customers/${customer_id}/bad-reports/${report_id}`;
        let payload = {content};
        return apiSender.put(route, payload);
    },
    deleteReport: (customer_id, report_id) => {
        let route = `/api/p/customers/${customer_id}/bad-reports/${report_id}`;
        return apiSender.delete(route);
    }
};