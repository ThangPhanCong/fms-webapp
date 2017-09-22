'use strict';

const React = require('react');
const { browserHistory } = require('react-router');
import store from 'store';

let FmsAuthen = require('FmsAuthen');

let FmsNavigation = React.createClass({
  onLogin: function () {
    FmsAuthen.onLogin();
  },
  onLogout: function () {
    FmsAuthen.onLogout();
  },
  renderItemRight: function () {
    let jwt = store.get('jwt');

    if (!jwt) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a onClick={this.onLogin} className="login-button">
              <span className="glyphicon glyphicon-log-in"></span> Log in</a>
          </li>
        </ul>
      )
    } else {
      let user_fb_id = store.get('user_fb_id');
      let user_name = store.get('user_name');
      let avaUser = `https://graph.facebook.com/v2.10/${user_fb_id}/picture`;

      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="user-info">
            <img className="user-ava" src={avaUser} />
            <span className="white-color"> {user_name}  </span>
          </li>
          <li><a onClick={this.onLogout} className="login-button">
            <span className="glyphicon glyphicon-log-out"></span> Log out</a>
          </li>

        </ul>
      )
    }
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">FMS</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav"></ul>
            {this.renderItemRight()}
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = FmsNavigation;
