import React from 'react';
import {connect} from 'react-redux';

import {Link, NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Image, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import {logOut} from '../../actions/auth';
import navItems from "../../containers/project-dashboard/common/NavItemConfig";

class FmsNavigation extends React.Component {

    onLogoutBtnClick() {
        const {dispatch} = this.props;
        dispatch(logOut());
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
            <div style={{backgroundColor: '#f3f3f4'}}>
                <div className="border-bottom container">
                    <nav className="navbar navbar-static-top" role="navigation"
                         style={{marginBottom: 0}}>

                        <div className="navbar-header">
                            <a className='navbar-brand' href='#'>
                                Adsbold
                            </a>
                        </div>

                        <ul className="nav navbar-top-links navbar-right pull-right">
                            <li className="dropdown" style={{marginRight: 0}}>
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#"
                                   style={{color: 'gray', padding: '10px 10px'}}>
                                    <Image src={avaUser} circle width={48} height={48}/>
                                    <span> </span>
                                    <i className="fa fa-caret-down"/>
                                </a>
                                <ul className="dropdown-menu dropdown-header-with-text">
                                    <li className='dropdown-header'>Đăng nhập:</li>
                                    <li className='dropdown-header'>{username}</li>
                                    <li className='divider'/>
                                    <li className=""><a onClick={self.onLogoutBtnClick.bind(this)}>Đăng xuất</a></li>
                                </ul>
                            </li>
                        </ul>

                    </nav>
                </div>
            </div>
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