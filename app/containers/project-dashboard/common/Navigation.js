import React, {Component} from 'react';
import {Location} from 'react-router-dom';
import NavItem from "./NavItem";

import navItems from './RouteConfig'
import {connect} from "react-redux";
import {logOut} from "../../../actions/auth";

class Navigation extends Component {

    onLogoutBtnClick() {
        const {dispatch} = this.props;
        dispatch(logOut());
    }

    componentDidMount() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    renderHeaderNavItem() {
        const {user} = this.props;
        const avaUser = `https://graph.facebook.com/v2.10/${user.fb_id}/picture`;

        return (
            <li className="nav-header">
                <div className="dropdown profile-element">
                    <img alt="avatar-user" className="img-circle nav-avatar" src={avaUser}/>
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear">
                                <span className="block m-t-xs">
                                <strong className="font-bold">{user.name}</strong>
                             </span>
                                <span className="text-muted text-xs block">Chủ cửa hàng
                                <b className="caret"/>
                            </span>
                            </span>
                    </a>
                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a onClick={this.onLogoutBtnClick.bind(this)}> Đăng xuất</a></li>
                    </ul>
                </div>
                <div className="logo-element">
                    <img alt="avatar-user" className="img-circle nav-avatar" src={avaUser}/>
                </div>
            </li>
        )
    }

    renderNavItems(navItems) {
        return navItems.map(
            (item, i) => <NavItem key={i} navItem={item} {...this.props}/>
        )
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    {
                        this.renderHeaderNavItem()
                    }

                    {
                        this.renderNavItems(navItems)
                    }
                </ul>

            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(Navigation)