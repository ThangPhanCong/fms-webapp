var React = require('react');
var Cookie = require('universal-cookie');
var {browserHistory} = require('react-router');
var FmsAuthen = require('FmsAuthen');

var FmsNavigation = React.createClass({
    onLogin: function () {
        FmsAuthen.onLogin();
    },
    onLogout: function () {
        FmsAuthen.onLogout();
    },
    renderLoginLogout: function () {
        let cookie = new Cookie();
        let jwt = cookie.get('jwt');
        if (!jwt) {
            return <a onClick={this.onLogin} id="login-button"><span className="glyphicon glyphicon-log-in"></span> Log in</a>;
        } else {
            return <a onClick={this.onLogout} id="login-button"><span className="glyphicon glyphicon-log-in"></span> Log out</a>;
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