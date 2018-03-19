import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class FmsNavLeftNotification extends Component {

    render() {
        const {match} = this.props;

        return (
            <ul className="navbar-noti">
                <li><NavLink
                    exact
                    to={match.url + "/general"}
                    replace
                >
                    Thông tin chung
                </NavLink></li>
                <li><NavLink
                    exact
                    to={match.url + "/security"}
                    replace
                >
                    Bảo mật
                </NavLink></li>

                <li className='devider'/>

                <li><NavLink
                    exact
                    to={match.url + "/notifications"}
                    replace
                >Thông báo
                </NavLink></li>

                <li><NavLink
                    exact
                    to={match.url + "/notifications/archived"}
                    replace
                >
                    Lưu trữ
                </NavLink></li>
            </ul>
        )
    }
}

export default FmsNavLeftNotification;