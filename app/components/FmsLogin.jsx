var React = require('react');

var FmsLogin = React.createClass({
    onLogin: function () {
        let fbOauthLoginBase = 'https://www.facebook.com/v2.8/dialog/oauth';
        let clientId = '1507361489342874';
        let redirectUri = encodeURI(`http://localhost:3001/api/fb/login_success`);
        let scope = 'public_profile,email,manage_pages,publish_pages,read_page_mailboxes,pages_messaging,user_posts,business_management';
        let fbLoginLink = `${fbOauthLoginBase}?auth_type=rerequest&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location = fbLoginLink;
    },
    render: function () {
        return (
            <div>
                <h1 className="page-title">Facebook manager suite</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout-auth">
                            <h3>Login</h3>
                            <p>Login with Facebook account below.</p>
                            <button className="button" onClick={this.onLogin}>Login With Facebook</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FmsLogin;