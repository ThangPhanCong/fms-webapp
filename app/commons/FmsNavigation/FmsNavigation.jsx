import React from 'react';
import {connect} from 'react-redux';

import {Link, NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import * as store from '../../helpers/storage';
import uuid from 'uuid';
import {Image, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import projectApi from '../../api/ProjectApi';
import {logOut} from '../../actions/auth';
import cvImg from '../../images/ic_conversation.png';
import settingsImg from '../../images/ic_settings.png';
import postsImg from '../../images/ic_posts.png';

class FmsNavigation extends React.Component {

  onLogoutBtnClick() {
    const {dispatch} = this.props;
    dispatch(logOut());
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
    let projectSelected = projects.find(p => p.alias === alias)
    let nameProjectSelected = projectSelected ? projectSelected.name : '';
  }

  render() {
    let self = this;

    const {isAuthenticated, user} = this.props;

    let userId = user ? user.fb_id : '';
    let username = user ? user.name : '';

    // let words_username = username.split(' ');
    // let lastname = words_username[words_username.length - 1];
    let avaUser = `https://graph.facebook.com/v2.10/${userId}/picture`;

    return (
      <Switch>
        <Route children={({match}) => (
          <div id="fms-nav">
            <Navbar inverse fixedTop fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Adsbold</Link>
                </Navbar.Brand>
                <Navbar.Toggle/>
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
                  {isAuthenticated ?
                    <NavDropdown id="log-out-dropdown" title={<Image src={avaUser} circle/>}>
                      <MenuItem header>Đăng nhập:</MenuItem>
                      <MenuItem header>{username}</MenuItem>
                      <MenuItem divider/>
                      <MenuItem onClick={self.onLogoutBtnClick.bind(this)}>Đăng xuất</MenuItem>
                    </NavDropdown>
                    : null
                  }
                </Nav>

                <Route path='/projects/:project_alias' children={({match}) => (
                  match && match.params ?
                    <ul className="nav navbar-nav navbar-right">
                      <li><NavLink exact to={'/projects/' + match.params.project_alias}
                                   className="project-nav-item"><Image className="ic-conversation" src={cvImg}/>HỘI
                        THOẠI</NavLink></li>
                      <li><NavLink to={'/projects/' + match.params.project_alias + '/posts'}
                                   className="project-nav-item"><Image src={postsImg}/>BÀI VIẾT</NavLink></li>
                      <li><NavLink to={'/projects/' + match.params.project_alias + '/settings'}
                                   className="project-nav-item"><Image src={settingsImg}/>CÀI ĐẶT</NavLink>
                      </li>
                      <NavItem className="devider"/>

                    </ul>
                    : null
                )}/>

              </Navbar.Collapse>
            </Navbar>
          </div>
        )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
};

export default withRouter(connect(mapStateToProps)(FmsNavigation));
