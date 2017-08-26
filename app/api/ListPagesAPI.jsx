var $ = require('jquery');
var Cookie = require('universal-cookie');
var axios = require('axios');

module.exports = {
    getPages: function (isActive) {
        var cookie = new Cookie;
        let access_token = cookie.get('jwt');
        var activePages = [];
        var inactivePages = [];
        if (access_token === undefined) {
            console.log("No access_token!");
            return [];
        }
        let requestUrl = `http://localhost:3001/api/pages?access_token=${access_token}`;
        return axios.get(requestUrl).then(function (res) {
            if (isActive) {
                return res.data.data.active;
            } else {
                return res.data.data.inactive;
            }
        }, function (err) {
            throw new Error(err);
        });
    }
};