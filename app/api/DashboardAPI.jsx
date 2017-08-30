var axios = require('axios');

let conversations = [
    {
        fb_id: "100004430053999",
        name: "Nguyễn Đăng Thế",
        messages: [
            {   
                message: "ok men",
                sender: {
                    fb_id: '1958682827749688',// user_id,
                    name: "Bùi Mạnh Thắng"
                }
            }, {
                message: "ok men em",
                sender: {
                    fb_id: '100004430053999', // user_id,
                    name: "Nguyễn Đăng Thế"
                }
            }
        ]
    },
    {
        fb_id: "100001815903421",
        name: "Nguyễn Tiến Minh",
        messages: [
            {   
                message: "Hello men!",
                sender: {
                    fb_id: '100001815903421',// user_id,
                    name: "Nguyễn Tiến Minh"
                }
            }, {
                message: "ok men em",
                sender: {
                    fb_id: '1958682827749688', // user_id,
                    name: "Bùi Mạnh Thắng"
                }
            }
        ]
    }
]

module.exports = {
    getConversations: function () {
        return conversations;
    }
}