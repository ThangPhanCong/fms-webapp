'use strict';

import React from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import store from 'store';
import uuid from 'uuid';
import {Image, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import projectApi from 'ProjectApi';
import FmsAuthen from 'FmsAuthen';
import cvImg from 'ic_conversation.png';

let FmsNavigation = React.createClass({
  getInitialState: function () {
    return {
      projects: []
    }
  },
  onLogin: function () {
    FmsAuthen.login();
  },
  onLogout: function () {
    FmsAuthen.logout();
  },
  componentDidMount: function () {
    let self = this;
    let jwt = store.get('jwt');

    if (jwt) {
      projectApi.getAllProject()
        .then(projects => self.setState({ projects }))
    }
  },
  renderProjectItems: function (projects) {
    return projects.map(project => {
      return (
        <MenuItem key={uuid()}
          onClick={self.onLogout}><Link to={'/projects/' + project.alias}>{project.name}</Link>
        </MenuItem>
      )
    })
  },
  renderSelectProjects: function () {
    let self = this;
    let projects = this.state.projects;

    // if (!this.props.location.pathname.includes('/projects') || !projects || projects.length == 0) return;

    let alias = this.props.match && this.props.match.params ? this.props.match.params.project_alias : '';
    let projectSelected = projects.find(p => p.alias == alias)
    let nameProjectSelected = projectSelected ? projectSelected.name : '';

    console.log('alias', alias);
    console.log('projectSelected', projectSelected);
    console.log('nameProjectSelected', nameProjectSelected);

    return (
      <NavDropdown id="log-out-dropdown" title={nameProjectSelected}>
        {self.renderProjectItems(projects)}
      </NavDropdown>
    )
  },
  render: function () {
    let self = this;
    let jwt = store.get('jwt');

    let user = store.get('user');
    let userId = user ? user.fb_id : '';
    let username = user ? user.name : '';

    let words_username = username.split(' ');
    let lastname = words_username[words_username.length - 1];
    let avaUser = `https://graph.facebook.com/v2.10/${userId}/picture`;

    return (
      <Switch>
        <Route path='/login' children={({match}) => (
            <div></div>
          )}/>
          
        <Route children={({match}) => (
          <Navbar inverse fixedTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Fms</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {
                  // self.renderSelectProjects()
                }
              </Nav>

              <Nav pullRight>

                {
                  // jwt ?
                  // <NavItem>
                  //   <Image src={avaUser} circle></Image>
                  //   <span>{lastname}</span>
                  // </NavItem> : null
                }
                { jwt ?
                  <NavDropdown id="log-out-dropdown" title="">
                    <MenuItem onClick={self.onLogout}>Đăng xuất</MenuItem>
                  </NavDropdown>
                  :
                  <li><Link to='/login'>Đăng nhập</Link></li>
                }
              </Nav>

              <Route path='/projects/:project_alias' children={({match}) => (
                match && match.params ?
                <Nav pullRight>
                  <li><Link to={'/projects/' + match.params.project_alias + '/'}>Conversations</Link></li>
                  <li><Link to={'/projects/' + match.params.project_alias + '/posts'}>Posts</Link></li>
                  <li><Link to={'/projects/' + match.params.project_alias + '/settings'}>Settings</Link></li>
                </Nav>
                : null
                )}/>

            </Navbar.Collapse>
          </Navbar>
        )} />
      </Switch>
    )
  }
});

module.exports = FmsNavigation;
