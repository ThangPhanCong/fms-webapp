import React from 'react';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import {Image} from 'react-bootstrap';

import {logOut} from '../../actions/auth';
import FmsNotificationPopup from "../../containers/notifimanager/notify-popup/FmsNotificationPopup";

class FmsNavigation extends React.Component {

    onLogoutBtnClick() {
        const {dispatch} = this.props;
        dispatch(logOut());
    }

    render() {
        let self = this;
        const {user, show_noti} = this.props;
        const {_id} = user;

        let userId = user ? user.fb_id : '';
        let username = user ? user.name : '';
        let avaUser = `https://graph.facebook.com/v2.10/${userId}/picture`;

        return (
            <div className='border-bottom'
                 style={{backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,.2)'}}>
                <div className="container">
                    <nav className="navbar navbar-static-top" role="navigation"
                         style={{marginBottom: 0, backgroundColor: 'white'}}>

                        <div className="navbar-header">
                            <a className='navbar-brand' href='#'>
                                Adsbold
                            </a>
                        </div>

                        <ul className="nav navbar-top-links navbar-right pull-right">
                            {show_noti ? <FmsNotificationPopup _id={_id}/> : null
                            }
                            <li className="dropdown" style={{marginRight: 0}}>
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#"
                                   style={{color: 'gray', padding: '10px 10px'}}>
                                    <Image src={avaUser} circle width={48} height={48}/>
                                    <span> </span>
                                    <i className="fa fa-caret-down"/>
                                </a>
                                <ul className="dropdown-menu dropdown-header-with-text">
                                    <li className='dropdown-header'>Đăng nhập:</li>
                                    <li className='dropdown-header'
                                        style={{color: '#676a6c', fontSize: '14px'}}>{username}</li>
                                    <li className='divider'/>
                                    <li className=""><a onClick={self.onLogoutBtnClick.bind(this)}
                                                        style={{textAlign: 'center'}}>Đăng xuất</a></li>
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
