import React from 'react';
import ReactDOM from 'react-dom';
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

    copyToClipboard() {
        let text = ReactDOM.findDOMNode(this.refs.phone);
        let textarea = document.createElement('textarea');
        textarea.id = 't';
        textarea.style.height = "0";
        textarea.style.width = "0";
        document.body.appendChild(textarea);
        textarea.value = text.innerText;
        document.querySelector('#t').select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        noti("success", "Đã sao chép số điện thoại");
        // let text = ReactDOM.findDOMNode(this.refs.phone);
        // let range = window.getSelection().getRangeAt(0);
        // range.selectNode(text);
        // window.getSelection().addRange(range);
        // document.execCommand('copy');
    }

    renderTextMsg(msg) {
        let msgItem = this.props.message;
        if (!this.props.isSelf && msgItem.is_phone && Array.isArray(msgItem.phone)) {
            let phone = msgItem.phone[0];
            let idx = msg.indexOf(phone);
            let before = <span>{msg.substr(0, idx)}</span>;
            let after = <span>{msg.substr(idx + phone.length)}</span>;
            let phoneElem = <div className="phone-hightlight clickable" ref="phone"
                                 onClick={this.copyToClipboard.bind(this)}>
                {phone}
            </div>;
            return <div>{before}{phoneElem}{after}</div>
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
