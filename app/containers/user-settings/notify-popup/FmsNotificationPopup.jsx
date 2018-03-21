import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    getNotifications,
    updateSeen,
    updateArchived
} from "../../../api/NotificationsApi";
import FmsNotiItem from "./FmsNotiItem";
import {countNotificationSeen} from "../../../utils/count-notifications";

class FmsNotificationPopup extends Component {
    state = {
        notifications: [],
        userid: null,
        is_seen: false,
        see_all: true,
        selectedArchive: null
    };

    onShowArchived(selectedArchive) {
        this.setState({
            selectedArchive
        })
    }

    onSeenNotification(is_seen, user_id) {
        const {notifications} = this.state;

        const all_archived = notifications.every(function (noti, index) {
            return noti.is_archived == true;
        });

        if (all_archived) {
            this.setState({
                see_all: false
            })
        }

        notifications.map((noti, i) => {

            if (!noti.is_seen) {
                updateSeen(true, user_id, noti._id, 'BASE')
                    .then(() => {
                        console.log("Successfully!")
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
                    .then(() => {
                        this.getListNotifications(user_id)
                    })
            }

        })

    }

    componentWillMount() {
        const {_id} = this.props;

        this.getListNotifications(_id)
        this.setState({
            userid: _id
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps._id && nextProps._id != this.props._id) {
    //         this.getListNotifications(nextProps._id);
    //         this.setState({
    //             userid: nextProps._id
    //         })
    //     }
    // }

    getListNotifications(_id) {
        getNotifications(_id, 'BASE')
            .then((data) => {
                this.setState({
                    notifications: data.reverse().slice(0, 1)
                })
            })
            .catch(() => {
                console.log("Get Notificaitons Error!")
            })
    }

    renderDropdownNotification() {
        const {
            selectedArchive,
            userid,
            see_all
        } = this.state;

        const {
            notifications
        } = this.state;

        const button_seeall = <li>
            <div className="text-center link-block">
                <Link to="/settings/notifications">
                    <strong>Xem tất cả </strong>
                    <i className="fa fa-angle-right"/>
                </Link>
            </div>
        </li>;

        const none_notification = <div className="text-center none_notify">
            <p className="text-notify">
                Không có thông báo mới!
            </p>
            <li className="divider"/>
            <br/>
            <div className="seeall-notify">
                <Link to="/settings/notifications">
                    <strong>Xem tất cả </strong>
                    <i className="fa fa-angle-right"/>
                </Link>
            </div>
        </div>;

        return (
            <li className="dropdown">
                <a className="dropdown-toggle count-info" data-toggle="dropdown"
                   onClick={() => this.onSeenNotification(false, userid)}>
                    <i className="fa fa-bell"/>
                    <span className="label label-primary">{
                        countNotificationSeen(notifications)
                    }</span>
                </a>
                <ul className="dropdown-menu dropdown-alerts"
                    style={see_all ? {maxHeight: '214px', width: '313px'} :
                        {height: '90px', overflowY: 'hidden', width: '300px'}}>
                    {notifications.map((noti, i) => {
                        if (!noti.is_archived) {
                            return (
                                <FmsNotiItem key={i}
                                             noti={noti}
                                             position={i}
                                             user_id={userid}
                                             onShowArchived={() => this.onShowArchived(i)}
                                             selectedArchive={selectedArchive}/>
                            )
                        }

                    })}

                    {
                        see_all ? button_seeall : none_notification
                    }

                </ul>
            </li>
        )
    }

    render() {
        return (
            this.renderDropdownNotification()
        )
    }
}

export default FmsNotificationPopup;