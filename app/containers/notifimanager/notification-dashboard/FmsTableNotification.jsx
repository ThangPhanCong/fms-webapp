import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import FmsNotificationItem from "./FmsNotificationItem";
import {AuthenService} from "../../../services/AuthenService";

class FmsTableNotification extends Component {
    state = {
        notifications: []
    };

    componentDidMount() {
        this.getNotification();
    }

    async getNotification() {
        const {_id} = AuthenService.getUser();

        try {
            const data = await getNotifications(_id, 'BASE');
            this.setState({
                notifications: data.filter(n => !n.is_archived).reverse()
            })
        } catch (err) {
            alert(err.message)
        }
    }

    render() {
        const {notifications} = this.state;

        if (notifications.length === 0) {
            return <p>Không có thông báo mới!</p>
        }

        return (
            <table className="table table-mail table-hover"
                   style={notifications.length != 0 ? {border: "solid 0.2px #EEEEEE"} : null}>
                <tbody>
                {notifications.map((noti, i) => {
                    return (
                        <FmsNotificationItem noti={noti} key={i} position={i}/>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

export default FmsTableNotification;
