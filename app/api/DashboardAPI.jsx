var axios = require('axios');

module.exports = {
    getClients: function () {
        return [
            {
                fb_id: "1958682827749688",
                name: "Bùi Mạnh Thắng",
                message: "Hay lắm :)",
                is_self: true
            },
            {
                fb_id: "100004430053999",
                name: "Nguyễn Đăng Thế",
                message: "Facebook Manager Suite",
                is_self: false
            },
            {
                fb_id: "100001815903421",
                name: "Nguyễn Tiến Minh",
                message: "Tools for client management",
                is_self: true
            }
        ]
    }
}