import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import {connect} from "react-redux";
import FmsNotificationItem from "./FmsNotificationItem";

class ArchiveNotification extends Component {
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
                <div style={{height: "48px", borderBottom: "solid 1px #F3F3F4"}}>
                    <button className="back-dashboard link-noti">
                        <i className="fa fa-reply-all"/>
                    </button>
                    <button className="archive-noti link-noti" style={{marginLeft: "4px"}}>
                        <i className="fa fa-refresh"/>
                    </button>
                </div>
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

const FmsArchiveNotification = connect(mapStateToProps)(ArchiveNotification)

export default FmsArchiveNotification;
