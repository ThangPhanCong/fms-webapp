import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import FmsNotificationItem from "./FmsNotificationItem";
import {AuthenService} from "../../../services/AuthenService";

class FmsArchiveNotification extends Component {
    state = {
        notifications: []
    };

    componentDidMount() {
        setTimeout(() => {
            this.getNotification()
        }, 100);
    }

    async getNotification() {
        const {_id} = AuthenService.getUser();
        let data;

        try {
            data = await getNotifications(_id, 'BASE');
        } catch (err) {
            aler(err.message)
        }

        const filer_data = data.filter(noti => noti.is_archived === true)

        this.setState({
            notifications: filer_data
        })
    }

    render() {
        const {notifications} = this.state;

        return (
            <div>
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
            </div>
        )
    }
}

export default FmsArchiveNotification;
