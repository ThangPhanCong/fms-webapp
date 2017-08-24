var React = require('react');
var FmsPageList = require('FmsPageList');
var FmsNavigation = require('FmsNavigation');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var FmsApp = React.createClass({
    enterPages: function () {
        hashHistory.push('/pages');
    },
    render: function () {
        return (
            <div className="container-fluid login-page">
                <FmsNavigation/>
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

module.exports = FmsApp;