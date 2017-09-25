'use strict';

import React from 'react';
import {Link} from 'react-router';
import store from 'store';
import uuid from 'uuid';

import projectApi from 'ProjectApi';

let FmsAuthen = require('FmsAuthen');

let FmsNavigation = React.createClass({
  onLogin: function () {
    FmsAuthen.onLogin();
  },
  onLogout: function () {
    FmsAuthen.onLogout();
  },
  getInitialState: function () {
    return {
      projects: []
    }
  },
  componentDidMount: function () {
    let self = this;
    let jwt = store.get('jwt');

    if (jwt) {
      projectApi.getAllProject()
        .then(projects => self.setState({ projects }))
    }
  },
  renderNavigationInProject: function () {
    if (/\/projects\/.*/.test(this.props.location.pathname) === false) return;

    let conversationItem = <li key="conversation-item"><Link activeClassName="active" to={"/projects/" + this.props.params.alias}>Conversation</Link></li>
    let postItem = <li key="post-item"><Link activeClassName="active" to={"/projects/" + this.props.params.alias + '/posts'}>Posts</Link></li>
    let settingItem = <li key="settings-item"><Link activeClassName="active" to={"/projects/" + this.props.params.alias + '/settings'}>Settings</Link></li>

    return [
      conversationItem,
      postItem,
      settingItem
    ]
  },
  renderItemRight: function () {
    let self = this;
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
      let userId = user ? user.fb_id : '';
      let username = user ? user.name : '';

      let words_username = username.split(' ');
      let lastname = words_username[words_username.length - 1];

      let avaUser = `https://graph.facebook.com/v2.10/${userId}/picture`;

      return (
        <ul className="nav navbar-nav navbar-right">
          {self.renderNavigationInProject()}
          <li className="user-info">
            <img className="user-ava" src={avaUser} />
            <span className="white-color"> {lastname}  </span>
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
    let projects = this.state.projects;

    if (!this.props.location.pathname.includes('/projects') || !projects || projects.length == 0) return;

    let alias = this.props.params ? this.props.params.alias : '';
    let projectSelected = projects.find(p => p.alias == alias)
    let projectNameSelected = projectSelected ? projectSelected.name : '';

    return (
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{projectNameSelected || 'Projects'} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            {self.renderProjectItems(projects)}
          </ul>
        </li>
      </ul>
    )
  },
  render: function () {
    let self = this;

    return (
      <div className="fms-nav">
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
      </div>
    );
  }
});

module.exports = FmsNavigation;
