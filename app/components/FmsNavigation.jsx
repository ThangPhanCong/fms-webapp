var React = require('react');
var Cookie = require('universal-cookie');

var FmsNavigation = React.createClass({
    onLogin: function () {
        let clientId = '1507361489342874';
        let redirectToClient = encodeURI('http://localhost:3000/pages');
        let redirectUri = encodeURI(`http://localhost:3001/api/fb/login_success`);
        let scope = 'public_profile,email,manage_pages,publish_pages,read_page_mailboxes,pages_messaging,user_posts,business_management';
        let fbLoginLink = `https://www.facebook.com/v2.8/dialog/oauth?auth_type=rerequest&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location = fbLoginLink;
    },
    onLogout: function () {
        
    },
    renderLoginLogout: function () {
        let cookie = new Cookie();
        let jwt = cookie.get('jwt');
        if (!jwt) {
            return <a onClick={this.onLogin} id="login-button"><span className="glyphicon glyphicon-log-in"></span> Đăng nhập</a>;
        } else {
            return <a onClick={this.onLogout} id="login-button"><span className="glyphicon glyphicon-log-in"></span> Đăng xuất</a>;
        }
    },
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Facebook Manager Suite</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>{this.renderLoginLogout()}</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});

module.exports = FmsNavigation;