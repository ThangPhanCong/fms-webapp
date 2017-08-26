var $ = require('jquery');
var Cookie = require('universal-cookie');
var axios = require('axios');

function getAllPages(isActive) {
    var cookie = new Cookie;
    let access_token = cookie.get('jwt');
    var activePages = [];
    var inactivePages = [];
    if (access_token === undefined) {
        console.log("No access_token!");
        return [];
    }
    let requestUrl = `http://13.229.76.229/api/pages?access_token=${access_token}`;
    return axios.get(requestUrl).then(function (res) {
        if (isActive) {
            return res.data.data.active;
        } else {
            return res.data.data.isactive;
        }
    }, function (res) {
        throw new Error(res);
    });
};

module.exports = {
    getActivePages: function () {
        return [];
    },
    getInactivePages: function () {
        return [
            { name: 'UET Chatbot', fb_id: '1037793939646192', category: 'Product/Service' },
            { name: 'Thinh Thom', fb_id: '1266831106759701', category: 'Product/Service' },
            { name: 'Something likes page', fb_id: '698047147071892', category: 'Product/Service' },
        ];
    }
};