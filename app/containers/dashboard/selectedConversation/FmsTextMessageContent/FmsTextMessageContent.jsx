import React from 'react';
import {connect} from 'react-redux';

import DashboardApi from '../../../../api/DashboardApi';

import {openPrivateRepModal} from '../../../../actions/dashboard/chat/privateRepModal';
import {noti} from "../../../notification/NotificationService";

class FmsTextMessageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHandling: false,
            liked: this.props.message.is_like
        };
        this.openMessageModal = this.openMessageModal.bind(this);
    }

    openMessageModal() {
        this.props.dispatch(openPrivateRepModal(this.props.message));
    }

    handleLikeMessage(state) {
        if (this.state.isHandling === true) return;
        this.setState({isHandling: true});
        DashboardApi.likeMessage(this.props.message._id, state).then(() => {
            this.setState({isHandling: false, liked: state});
        }, () => {
            this.setState({isHandling: false});
            alert('Something went wrong!');
        });
    }

    copyToClipboard(phone) {
        let textarea = document.createElement('textarea');
        textarea.id = 't';
        textarea.style.height = "0";
        textarea.style.width = "0";
        document.body.appendChild(textarea);
        textarea.value = phone;
        document.querySelector('#t').select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        noti("success", "Đã sao chép số điện thoại");
    }

    renderTextMsg(msg) {
        let msgItem = this.props.message;
        if (!this.props.isSelf && Array.isArray(msgItem.phone) && msgItem.phone.length > 0) {
            let phoneIdx = msgItem.phone.map(phone => {
                return msg.indexOf(phone);
            });
            let phoneEles = phoneIdx.map((idx, index) => {
                return <div className="phone-hightlight clickable" ref="phone"
                            onClick={() => {this.copyToClipboard(msgItem.phone[index])}}>{msgItem.phone[index]}</div>;
            });
            let msgElement = <span/>, cIndex = 0;
            phoneEles.forEach((ele, index) => {
                let before = <span>{msg.substr(cIndex, phoneIdx[index] - cIndex)}</span>;
                msgElement = <span>{msgElement}{before}{ele}<span>{" "}</span></span>;
                cIndex = phoneIdx[index] + msgItem.phone[index].length;
                if (index === phoneIdx.length - 1) {
                    let after = <span>{msg.substr(cIndex)}</span>;
                    msgElement = <span>{msgElement}{after}</span>;
                }
            });
            return <div>{msgElement}</div>
        } else {
            return <p>{msg}</p>;
        }
    }

    render() {
        let self = this;
        let actionButton = (this.props.isSelf === false && this.props.type === "comment") ? "" : " hide";

        function renderLikeButton() {
            if (self.state.liked === false) {
                return <a className="action-button-message" onClick={() => {
                    self.handleLikeMessage(true)
                }}> Thích</a>
            } else {
                return <a className="action-button-message" onClick={() => {
                    self.handleLikeMessage(false)
                }}> Bỏ thích</a>
            }
        }

        function renderMessageButton() {
            if (self.props.message.can_reply_privately === true) {
                return <a className="action-button-message" onClick={self.openMessageModal}>Nhắn tin</a>
            } else {
                return <span className="disabled-action-button-message">Nhắn tin</span>
            }
        }

        return (
            <div>
                {this.renderTextMsg(this.props.textMessage)}
                <div className={"group-action-button-message" + actionButton}>
                    {renderLikeButton()}&nbsp;&nbsp;&nbsp;
                    {renderMessageButton()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}
};
export default connect(mapStateToProps)(FmsTextMessageContent);
