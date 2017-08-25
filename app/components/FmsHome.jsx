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
                <p className="page-description">Công cụ quản lý tương tác, khách hàng, bán hàng tại quẩy, tích hợp vận chuyển, và các tiện ích hỗ trợ</p>
                <button className="button" onClick={this.enterPages}>VÀO ỨNG DỤNG</button>
                <div className="image-description">
                    <img src="https://pages.fm/static/images/pancake-banner.png"/>
                </div>
            </div>
        );
    }
});

module.exports = FmsHome;