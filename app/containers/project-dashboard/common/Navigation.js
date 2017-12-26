import React, {Component} from 'react';
import {Link, Location} from 'react-router-dom';
import profileMockup from '../../../assets/images/mockup/profile_small.jpg';
import NavItem from "./NavItem";

import navItems from './NavItemConfig'

class Navigation extends Component {

    componentDidMount() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    renderHeaderNavItem() {
        return (
            <li className="nav-header">
                <div className="dropdown profile-element">
                    <img alt="avatar-user" className="img-circle" src={profileMockup}/>
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear">
                                <span className="block m-t-xs">
                                <strong className="font-bold">Nguyễn Văn Vui</strong>
                             </span>
                                <span className="text-muted text-xs block">Nhân viên bán hàng
                                <b className="caret"/>
                            </span>
                            </span>
                    </a>
                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a href="#"> Đăng xuất</a></li>
                    </ul>
                </div>
                <div className="logo-element">
                    <img alt="avatar-user" className="img-circle" src={profileMockup}/>
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

export default Navigation;