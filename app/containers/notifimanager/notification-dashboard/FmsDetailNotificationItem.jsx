import React, {Component} from "react";
import {getNotifications, updateArchived} from "../../../api/NotificationsApi";
import {AuthenService} from "../../../services/AuthenService";

class FmsDetailNotificationItem extends Component {
    state = {
        current_notifi: {}
    };

    componentWillMount() {
        this.getNotification();
    }

    async getNotification() {
        const {_id} = AuthenService.getUser();
        const {id} = this.props.match.params;
        let data;

        try {
            data = await getNotifications(_id, 'BASE');

        } catch (err) {
            alert(err.message)
        }

        this.setState({
            current_notifi: data.find(noti => noti._id === id)
        })
    }

    // onGoback() {
    //     this.props.history.goBack();
    // }
    async onUpdateArchived(is_archived) {
        const {_id} = AuthenService.getUser();
        const {id} = this.props.match.params;
        let data;

        try {
            await updateArchived(is_archived, _id, id, 'BASE');
            data = await getNotifications(_id, 'BASE');
            // if (is_archived) {
            //     noti('success', 'Đã lưu trữ thông báo này!')
            // } else {
            //     noti('danger', 'Đã bỏ lưu thông báo này!')
            // }
        } catch (err) {
            alert(err.message);
        }
        this.setState({
            current_notifi: data.find(noti => noti._id === id)
        })
    }

    render() {
        const {current_notifi} = this.state;

        return (
            <div>
                {!current_notifi.is_archived ?
                    <button className="btn btn-outline btn-sm btn-white button-archive"
                            onClick={() => this.onUpdateArchived(true)}
                    >Lưu trữ</button> : null
                }

                <h3>{current_notifi.title}</h3>

                <p>{current_notifi.content}</p>
            </div>
        )
    }
}

export default FmsDetailNotificationItem;