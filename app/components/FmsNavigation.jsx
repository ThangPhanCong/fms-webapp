'use strict';
// todo: refactor
const React = require('react');
const Cookie = require('universal-cookie');
const { browserHistory } = require('react-router');

let FmsAuthen = require('FmsAuthen');

let FmsNavigation = React.createClass({
  onLogin: function () {
    FmsAuthen.onLogin();
  },
  onLogout: function () {
    FmsAuthen.onLogout();
  },
  renderItemRight: function () {
    let cookie = new Cookie();
    let jwt = cookie.get('jwt');

    if (!jwt) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a onClick={this.onLogin} id="login-button">
              <span className="glyphicon glyphicon-log-in"></span> Log in</a>
          </li>
        </ul>
      )
    } else {
      let user_fb_id = cookie.get('user_fb_id');
      let user_name = cookie.get('user_name');
      let avaUser = `https://graph.facebook.com/v2.10/${user_fb_id}/picture`;

      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <img className="user-ava" src={avaUser} /> {user_name}
          </li>
          <li><a onClick={this.onLogout}
            id="login-button"><span className="glyphicon glyphicon-log-in"></span> Log out</a>
          </li>

        </ul>
      )
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
              <a className="navbar-brand" href="/">Facebook Management Suite</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav"></ul>
              {this.renderItemRight()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = FmsNavigation;
