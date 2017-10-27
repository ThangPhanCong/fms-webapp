

import React from 'react';

import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import * as store from '../helpers/storage';
import uuid from 'uuid';
import { Image, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import projectApi from 'ProjectApi';
import FmsAuthen from 'FmsAuthen';
import cvImg from 'ic_conversation.png';
import settingsImg from 'ic_settings.png';
import postsImg from 'ic_posts.png';

class FmsNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.renderProjectItems = this.renderProjectItems.bind(this);
    this.renderSelectProjects = this.renderSelectProjects.bind(this);
  }
  onLogin() {
    FmsAuthen.login();
  }
  onLogout() {
    FmsAuthen.logout();
  }
  componentDidMount() {
    let self = this;
    let jwt = store.get('jwt');

    if (jwt) {
      projectApi.getAllProject()
        .then(projects => self.setState({ projects }))
    }
  }
  renderProjectItems(projects) {
    return projects.map(project => {
      return (
        <MenuItem key={uuid()}
          onClick={self.onLogout}><Link to={'/projects/' + project.alias}>{project.name}</Link>
        </MenuItem>
      )
    })
  }
  renderSelectProjects() {
    let self = this;
    let projects = this.state.projects;

    let alias = this.props.match && this.props.match.params ? this.props.match.params.project_alias : '';
    let projectSelected = projects.find(p => p.alias == alias)
    let nameProjectSelected = projectSelected ? projectSelected.name : '';
  }
  render() {
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
        <Route path='/login' children={({ match }) => (
          <div></div>
        )} />

        <Route children={({ match }) => (
          <div id="fms-nav">
            <Navbar inverse fixedTop fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Fms</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                {
                  // <Route path='/projects' children={({match}) => {
                  //     let projects = self.state.projects;
                  //
                  //     let alias = match.params ? match.params.project_alias : '';
                  //     let projectSelected = projects.find(p => p.alias == alias)
                  //     let nameProjectSelected = projectSelected ? projectSelected.name : '';
                  //     let dropdownTitle = nameProjectSelected ? nameProjectSelected : 'Projects';
                  //
                  //     return (
                  //       <Nav>
                  //         <NavDropdown id="projects-dropdown" title={dropdownTitle}>
                  //           {
                  //             // projects.map(p => (
                  //             //   <MenuItem key={uuid()}>{p.name}</MenuItem>
                  //             // ))
                  //           }
                  //         </NavDropdown>
                  //       </Nav>
                  //     )
                  //   }}/>
                }

                <Nav pullRight className="nav-user">
                  {
                    jwt ?
                      <NavItem>
                        <Image src={avaUser} circle></Image>
                      </NavItem> : null
                  }
                  {jwt ?
                    <NavDropdown id="log-out-dropdown" title="">
                      <MenuItem onClick={self.onLogout}>Đăng xuất</MenuItem>
                    </NavDropdown>
                    : null
                    // <li><Link to='/login'>Đăng nhập</Link></li>
                  }
                </Nav>

                <Route path='/projects/:project_alias' children={({ match }) => (
                  match && match.params ?
                    <Nav pullRight>
                      <li><NavLink exact to={'/projects/' + match.params.project_alias} className="project-nav-item"><Image className="ic-conversation" src={cvImg} />HỘI THOẠI</NavLink></li>
                      <li><NavLink to={'/projects/' + match.params.project_alias + '/posts'} className="project-nav-item"><Image src={postsImg} />BÀI VIẾT</NavLink></li>
                      <li><NavLink to={'/projects/' + match.params.project_alias + '/settings'} className="project-nav-item"><Image src={settingsImg} />CÀI ĐẶT</NavLink></li>
                      <NavItem className="devider" />
                    </Nav>
                    : null
                )} />

              </Navbar.Collapse>
            </Navbar>
          </div>
        )} />
      </Switch>
    )
  }
}

module.exports = FmsNavigation;
