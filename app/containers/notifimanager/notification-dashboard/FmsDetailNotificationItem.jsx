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

    // onGoback() {
    //     this.props.history.goBack();
    // }
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
                        <span className="edit-archive">
                            {current_notifi.is_archived ?
                                <FmsTooltip text_tooltip="Bỏ lưu" position="bottom">
                                    <i className="fa fa-window-close"
                                       onClick={() => this.onUpdateArchived(false)}
                                       style={{paddingLeft: "3px"}}/>
                                </FmsTooltip> : <FmsTooltip text_tooltip="Lưu trữ" position="bottom">
                                    <i className="fa fa-download"
                                       onClick={() => this.onUpdateArchived(true)}
                                       style={{paddingLeft: "3px"}}/>
                                </FmsTooltip>}
                        </span>

                        </span>
                    <p className="user-receive">
                        tới {user.name}
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

export default connect(mapStateToProps)(FmsDetailNotificationItem);
