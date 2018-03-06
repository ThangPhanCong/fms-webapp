import React, {Component} from "react";
import {connect} from "react-redux";
import {getNotifications, updateArchived} from "../../../api/NotificationsApi";
import FmsTooltip from "../../../commons/tooltip/FmsTooltip";
import {noti} from "../../notification/NotificationService";

class FmsDetailNotificationItem extends Component {
    state = {
        current_notifi: {}
    };

    componentWillMount() {
        this.getNotification();
    }

    async getNotification() {
        const {_id} = this.props.user;
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
        const {_id} = this.props.user;
        const {id} = this.props.match.params;
        let data;

        try {
            await updateArchived(is_archived, _id, id, 'BASE');
            data = await getNotifications(_id, 'BASE');
            if (is_archived) {
                noti('success', 'Đã lưu trữ thông báo này!')
            } else {
                noti('danger', 'Đã bỏ lưu thông báo này!')
            }
        } catch (err) {
            alert(err.message);
        }
        this.setState({
            current_notifi: data.find(noti => noti._id === id)
        })
    }

    render() {
        const {current_notifi} = this.state;
        const {user} = this.props;

        return (
            <div>
                <div style={{
                    height: "75px"
                }}>
                    <span className="title-noti">
                        {current_notifi.title}
                    </span>
                </div>
                <div style={{height: "75px", border: "solid 0.2px #EEEEEE", borderLeft: "none", borderBottom: "none"}}>
                    <span style={{paddingLeft: "10px"}}>
                        <img className="admin-avatar"
                             src="https://graph.facebook.com/v2.10/596938700697551/picture"/>
                        <span className="text-admin">Admin</span>
                        <span>&lt;admin@adsbold.com&gt; </span>
                        <span className="edit-archive">
                            {current_notifi.is_archived ?
                                <FmsTooltip text_tooltip="Bỏ lưu" position="bottom">
                                    <button className="btn btn-primary pull-right button-archive"
                                            onClick={() => this.onUpdateArchived(false)}>Bỏ lưu
                                    </button>
                                </FmsTooltip> : <FmsTooltip text_tooltip="Lưu trữ" position="bottom">
                                    <button className="btn btn-danger pull-right button-archive"
                                            onClick={() => this.onUpdateArchived(true)}>Lưu trữ
                                    </button>
                                </FmsTooltip>}
                        </span>

                        </span>
                    <span className="user-receive">
                        tới {user.name}
                    </span>

                </div>
                <div>
                    <p className="content-noti">
                        {current_notifi.content}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(FmsDetailNotificationItem);