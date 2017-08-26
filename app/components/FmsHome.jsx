var React = require('react');
var { browserHistory } = require('react-router');
var FmsAuthen = require('FmsAuthen');
var Cookie = require('universal-cookie');

var FmsHome = React.createClass({
    enterPages: function () {
        var cookie = new Cookie();
        let jwt = cookie.get('jwt');
        if (jwt) {
            browserHistory.push('/pages');
        } else {
            FmsAuthen.onLogin();
        }
    },
    render: function () {
        return (
            <div className="container-fluid homepage">
                <h1 className="page-title">Facebook Manager Suite</h1>
                <p className="page-description">Tools for conversation management, customers, selling at stall, integrated transportation and supporting utilities</p>
                <button className="button" onClick={this.enterPages}>ENTER DASHBOARD</button>
                <div className="image-description">
                    <img src="https://pages.fm/static/images/pancake-banner.png"/>
                </div>
            </div>
        );
    }
});

module.exports = FmsHome;