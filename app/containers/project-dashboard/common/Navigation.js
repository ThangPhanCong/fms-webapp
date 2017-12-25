import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link, Location} from 'react-router-dom';
import profileMockup from '../../../assets/images/mockup/profile_small.jpg';

class Navigation extends Component {

    componentDidMount() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                            <img alt="avatar-user" className="img-circle" src={profileMockup}/>
                            <span></span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Nguyễn Văn Vui</strong>
                             </span> <span className="text-muted text-xs block">Nhân viên bán hàng <b
                                className="caret"/></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#"> Đăng xuất</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            <img alt="avatar-user" className="img-circle" src={profileMockup}/>
                        </div>
                    </li>
                    
                    <li className={this.activeRoute("main")}>
                        <Link to="main"><i className="fa fa-th-large"></i> <span className="nav-label">Main view</span></Link>
                    </li>
                    
                    <li className={this.activeRoute("minor")}>
                        <Link to="minor"><i className="fa fa-th-large"></i> <span
                            className="nav-label">Minor view</span></Link>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Navigation