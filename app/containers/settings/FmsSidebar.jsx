import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Route, withRouter} from 'react-router-dom';

class FmsSidebar extends React.Component {
  render() {
    return (
      <Route path='/projects/:project_alias' children={({match}) => (
        match && match.params ?
          <ul className="setting-sidebar">
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/general'} className="nav-link">
              <li>Chung</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/tag'} className="nav-link">
              <li>Thẻ</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/page'} className="nav-link">
              <li>Trang</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/post'} className="nav-link disable-link"
                     onClick={e => e.preventDefault()}>
              <li>Bài viết</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/customer'}
                     className="nav-link disable-link" onClick={e => e.preventDefault()}>
              <li>Khách hàng</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/answer'}
                     className="nav-link disable-link" onClick={e => e.preventDefault()}>
              <li>Mẫu câu trả lời</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/employ'}
                     className="nav-link disable-link" onClick={e => e.preventDefault()}>
              <li>Nhân viên CSKH</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/noti'} className="nav-link disable-link"
                     onClick={e => e.preventDefault()}>
              <li>Thông báo</li>
            </NavLink>
            <NavLink to={'/projects/' + match.params.project_alias + '/settings/pay'} className="nav-link disable-link"
                     onClick={e => e.preventDefault()}>
              <li>Thanh toán</li>
            </NavLink>
          </ul>
          : null
      )}/>
    );
  }
}

export default withRouter(connect()(FmsSidebar));
