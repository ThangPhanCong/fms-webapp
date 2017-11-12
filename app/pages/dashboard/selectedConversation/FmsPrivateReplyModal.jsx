import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import DashboardAPI from '../../../api/DashboardApi';
import { sendPrivateRepMsg, togglePrivateRepModal } from '../../../actions/dashboard/chat/privateRepModal';

class FmsPrivateReplyModal extends React.Component {
	close() {
		this.props.dispatch(togglePrivateRepModal(false));
	}
	handleSendButton() {
		let message = this.refs.message_text.value;
		this.props.dispatch(sendPrivateRepMsg(this.props.message._id, message, this.props.handleSendMessage));
	}
	render() {
		return (
			<Modal show={this.props.isShown} onHide={this.close.bind(this)} backdrop='static' keyboard={false} >
				<Modal.Header closeButton={this.props.isSending == false}>
					<Modal.Title>Nhắn tin đến {this.props.message.from.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<textarea className="textarea-private-reply" placeholder="Nhập tin nhắn" ref="message_text" rows={5} />
				</Modal.Body>
				<Modal.Footer>
					<div className="private-rep-modal-footer-wrapper">
						<button type="button" className={"btn btn-primary private-rep-btn"}
							disabled={this.props.isSending}
							onClick={this.handleSendButton.bind(this)}>Gửi</button>
					</div>
				</Modal.Footer>
			</Modal>
		)
	}
}

const mapStateToProps = state => {
  return {
    isShown: state.dashboard.chat.privateRepModalShown,
    isSending: state.dashboard.chat.isSendingPrivateMsg
  }
}

export default connect(mapStateToProps)(FmsPrivateReplyModal);
