'use strict';

const React = require('react');
const {browserHistory} = require('react-router');
import store from 'store';

let FmsAuthen = require('FmsAuthen');

let FmsHome = React.createClass({
  enterPages: function() {
    let jwt = store.get('jwt');
    if (jwt) {
      browserHistory.push('/projects');
    } else {
      FmsAuthen.onLogin();
    }
  },
  componentDidMount: function () {
    let jwt = store.get('jwt');
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
