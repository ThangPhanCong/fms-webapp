import React from 'react';
import {Nav, NavItem} from "react-bootstrap"
import {connect} from 'react-redux';
import {Link, NavLink, Route, Switch, withRouter} from 'react-router-dom';
class FmsSidebar extends React.Component {
  render() {
    return (
      <Route path='/projects/:project_alias' children={({ match }) => (
        match && match.params ?
        <ul className="setting-sidebar">
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/general'} className="nav-link"><li>Chung</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/tag'} className="nav-link"><li>Thẻ</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/page'} className="nav-link"><li>Trang</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/post'} className="nav-link"><li>Bài viết</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/customer'} className="nav-link"><li>Khách hàng</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/answer'} className="nav-link"><li>Mẫu câu trả lời</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/employ'} className="nav-link"><li>Nhân viên CSKH</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/noti'} className="nav-link"><li>Thông báo</li></NavLink>
          <NavLink to={'/projects/' + match.params.project_alias + '/settings/pay'} className="nav-link"><li>Thanh toán</li></NavLink>
      </ul>
          : null
      )} />


      );
  }
}

export default withRouter(connect()(FmsSidebar));
