import React from 'react';
import {Nav, NavItem} from "react-bootstrap"
import {connect} from 'react-redux';
import {Link, NavLink, Route, Switch, withRouter} from 'react-router-dom';
class FmsSidebar extends React.Component {
  render() {
    let self = this;

    return (
      <Route path='/projects/:project_alias' children={({ match }) => (
        match && match.params ?
        <Nav vertical="vertical">
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/general'}>Chung</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/tag'}>Thẻ</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/page'}>Trang</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/post'}>Bài viết</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/customer'}>Khách hàng</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/answer'}>Mẫu câu trả lời</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/employ'}>Nhân viên CSKH</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/noti'}>Thông báo</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  exact to={'/projects/' + match.params.project_alias + '/settings/pay'}>Thanh toán</NavLink>
        </NavItem>
      </Nav>
          : null
      )} />


      );
  }
}

export default withRouter(connect()(FmsSidebar));
