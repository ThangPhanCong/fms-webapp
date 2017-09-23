'use strict';

const React = require('react');
const { browserHistory, Link } = require('react-router');
import store from 'store';
import uuid from 'uuid';

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
      let user = store.get('user');
      let avaUser = `https://graph.facebook.com/v2.10/${user.fb_id}/picture`;

      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="user-info">
            <img className="user-ava" src={avaUser} />
            <span className="white-color"> {user.name}  </span>
          </li>
          <li><a onClick={this.onLogout} className="login-button">
            <span className="glyphicon glyphicon-log-out"></span> Log out</a>
          </li>

        </ul>
      )
    }
  },
  renderProjectItems: function (projects) {
    return projects.map(project => {
      return (
        <li key={uuid()}><a href={'/projects/' + project.alias}>{project.name}</a></li>
      )
    })
  },
  renderSelectProjects: function () {
    let self = this;
    console.log('location');

    let projects = [
      {
        alias : "2pages",
        name : "2 pages"
      },
      {
        alias : "myproject",
        name : "myproject sdf"
      },
      {
        alias : "2pages",
        name : "sdfsd fsdfs df"
      }
    ]

    return (
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
          <ul className="dropdown-menu">
            {self.renderProjectItems(projects)}
          </ul>
        </li>
      </ul>
    )
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
            {this.renderSelectProjects()}
            {this.renderItemRight()}
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = FmsNavigation;
