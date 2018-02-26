import React, {Component} from "react";
import {connect} from "react-redux";
import {getNotifications, updateArchived} from "../../../api/NotificationsApi";
import FmsTooltip from "../../../commons/tooltip/FmsTooltip";


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

    onGoback() {
        this.props.history.goBack();
    }

    async onUpdateArchived(is_archived) {
        const {_id} = this.props.user;
        const {id} = this.props.match.params;

        try {
            await updateArchived(is_archived, _id, id, 'BASE')
        } catch (err) {
            alert(err.message);
        }
        this.props.history.goBack();
    }

    render() {
        const {current_notifi} = this.state;
        const {user} = this.props;

        return (
            <div>
                <div style={{height: "48px", borderBottom: "solid 1px #F3F3F4"}}>
                    <div>
                        <FmsTooltip text_tooltip="Quay lại"
                                    position="bottom">
                            <button className="back-dashboard link-noti" onClick={() => this.onGoback()}>
                                <i className="fa fa-reply-all"/>
                            </button>
                        </FmsTooltip>
                        {current_notifi.is_archived ? <FmsTooltip text_tooltip="Bỏ lưu" position="bottom">
                            <button className="archive-noti"
                                    onClick={() => this.onUpdateArchived(false)}
                                    style={{marginLeft: "4px"}}>
                                <i className="fa fa-window-close"/>
                            </button>
                        </FmsTooltip> : <FmsTooltip text_tooltip="Lưu trữ" position="bottom">
                            <button className="archive-noti"
                                    onClick={() => this.onUpdateArchived(true)}
                                    style={{marginLeft: "4px"}}>
                                <i className="fa fa-download"/>
                            </button>
                        </FmsTooltip>}

                    </div>

                </div>

                <div style={{
                    height: "47px", borderBottom: "solid 1px #E5E5E5"
                }}>
                    <span className="title-noti">
                        {current_notifi.title}
                    </span>
                </div>
                <div>
                    <span style={{fontWeight: "bold", color: "black"}}>
                        <img className="admin-avatar"
                             src="https://graph.facebook.com/v2.10/596938700697551/picture"/>
                        Admin
                    </span>
                    <p className="user-receive">
                        tới {user.name}
                        <i className="fa fa-sort-desc"/>
                    </p>
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

const FmsShowNotificationItem = connect(mapStateToProps)(FmsDetailNotificationItem)

export default FmsShowNotificationItem;
