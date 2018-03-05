import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import {connect} from "react-redux";
import FmsNotificationItem from "./FmsNotificationItem";

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
        const {_id} = this.props.user;
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
                <table className="table table-mail table-hover">
                    <tbody>
                    {notifications.map((noti, i) => {
                        return (
                            <FmsNotificationItem noti={noti} key={i}/>
                        )

                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(FmsArchiveNotification);
