import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import {connect} from "react-redux";
import FmsNotificationItem from "./FmsNotificationItem";

class FmsTableNotification extends Component {
    state = {
        notifications: []
    };

    componentDidMount() {
        setTimeout(() => {
            this.getNotification();
        }, 100)
    }

    async getNotification() {
        const {_id} = this.props.user;
        let data;

        try {
            data = await getNotifications(_id, 'BASE');
        } catch (err) {
            aler(err.message)
        }

        this.setState({
            notifications: data.reverse()
        })
    }

    render() {
        const {notifications} = this.state;

        return (
            <table className="table table-mail table-hover">
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

const TableNotification = connect(mapStateToProps)(FmsTableNotification)

export default TableNotification;
