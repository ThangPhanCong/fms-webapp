import React from 'react';
import {Nav, NavItem} from "react-bootstrap"
import {connect} from 'react-redux';
import {Link, NavLink, Route, Switch, withRouter} from 'react-router-dom';
class FmsSidebar extends React.Component {
  render() {
    return (
      <Route path='/projects/:project_alias' children={({ match }) => (
        match && match.params ?
        <Nav vertical="vertical" className="setting-sidebar">
        <NavItem className="nav-item">
          <NavLink exact to={'/projects/' + match.params.project_alias + '/settings/general'} className="nav-link">Chung</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/tag'} className="nav-link">Thẻ</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/page'} className="nav-link">Trang</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/post'} className="nav-link">Bài viết</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/customer'} className="nav-link">Khách hàng</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/answer'} className="nav-link">Mẫu câu trả lời</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/employ'} className="nav-link">Nhân viên CSKH</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/noti'} className="nav-link">Thông báo</NavLink>
        </NavItem>
        <NavItem className="nav-item">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/pay'} className="nav-link">Thanh toán</NavLink>
        </NavItem>
      </Nav>
          : null
      )} />


      );
  }
}

export default withRouter(connect()(FmsSidebar));
