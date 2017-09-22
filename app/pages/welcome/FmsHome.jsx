'use strict';

const React = require('react');
const {browserHistory} = require('react-router');
const Cookie = require('universal-cookie');

let FmsAuthen = require('FmsAuthen');

let FmsHome = React.createClass({
  enterPages: function() {
    let cookie = new Cookie();
    let jwt = cookie.get('jwt');
    if (jwt) {
      browserHistory.push('/projects');
    } else {
      FmsAuthen.onLogin();
    }
  },
  componentDidMount: function () {
    let cookie = new Cookie();
    let jwt = cookie.get('jwt');
    if (jwt) {
      browserHistory.push('/projects');
    }
  },
  render: function() {
    return (
      <div className="container-fluid homepage page">
        <h1 className="page-title">Facebook Management Suite</h1>
        <p className="page-description">Tools for conversation management, customers, selling at stall, integrated transportation and supporting utilities</p>
        <button className="button" onClick={this.enterPages}>ENTER DASHBOARD</button>
      </div>
    );
  }
});

module.exports = FmsHome;
