var React = require('react');
var Cookie = require('universal-cookie');
var {browserHistory} = require('react-router');

module.exports = {
    onLogin: function () {
        let clientId = '1507361489342874';
        let redirectToClient = encodeURI('http://localhost:3000/pages');
        let redirectUri = encodeURI(`http://13.229.76.229/api/fb/login_success`);
        let scope = 'public_profile,email,manage_pages,publish_pages,read_page_mailboxes,pages_messaging,user_posts,business_management';
        let fbLoginLink = `https://www.facebook.com/v2.8/dialog/oauth?auth_type=rerequest&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        // test
        let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYl9pZCI6IjE5NTg2ODI4Mjc3NDk2ODgiLCJuYW1lIjoiQsO5aSBN4bqhbmggVGjhuq9uZyIsImlhdCI6MTUwMzY0MzMyMH0.a7Z_pLzVpW7Z7efyM_V2q0rGQY80B8QHGnqxf5qvNs4';
        window.location = fbLoginLink;
        let cookie = new Cookie();
        cookie.set('jwt', access_token);
    },
    onLogout: function () {
        let cookie = new Cookie();
        cookie.remove('jwt');
        browserHistory.push('/');
    }
}