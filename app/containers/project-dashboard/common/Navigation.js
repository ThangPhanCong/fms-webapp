import React, {Component} from 'react';
import {Link, Location} from 'react-router-dom';
import NavItem from "./NavItem";

import {treeConfig, filterConfigByPerms} from './RouteConfig'
import {AuthenService} from "../../../services/AuthenService";
import defaultAva from "../../../assets/images/default_ava.jpg";

class Navigation extends Component {

    onLogoutBtnClick() {
        AuthenService.logOut();
    }

    updateMenu() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    componentDidMount() {
        this.updateMenu();
    }

    componentDidUpdate() {
        this.updateMenu();
    }

    renderHeaderNavItem() {
        const user = AuthenService.getUser();
        const {
            project
        } = this.props;
        const avaUser = user.fb_id ? `https://graph.facebook.com/v2.10/${user.fb_id}/picture` : defaultAva;

        return (
            <li className="nav-header">
                <div className="dropdown profile-element">
                    <img alt="avatar-user" className="img-circle nav-avatar" src={avaUser}/>
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear">
                                <span className="block m-t-xs">
                                <strong className="font-bold">{user.name}</strong></span>
                                <span className="text-muted text-xs block">
                                    {project ? project.role.name : null}
                                    <b className="caret"/></span>
                            </span>
                    </a>
                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                        <li><Link to='/settings'> Cài đặt</Link></li>
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
        const {project} = this.props;

        if (!project) return null;

        const authNavItems = filterConfigByPerms(treeConfig, project.role.permissions);

        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    {
                        this.renderHeaderNavItem()
                    }

                    {
                        this.renderNavItems(authNavItems)
                    }
                </ul>

            </nav>
        )
    }
}

export default Navigation;