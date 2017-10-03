'use strict'

const React = require('react');
const Modal = require('react-bootstrap').Modal;

let DashboardAPI = require('DashboardAPI');

let FmsPrivateReplyModal = React.createClass({
  getInitialState: function () {
    return {
      isShown: false
    }
  },
	handleSendButton: function () {
		let message = this.refs.message_text.value;
		if (message && message != "") {
			DashboardAPI.postPrivateReplyMessage(this.props.message.fb_id, message).then((res) => {
				this.close();
				this.props.handleSendMessage();
			}, (err) => {
				throw new Error(err);
				alert("Không thể gửi tin nhắn");
			})
		}
	},
  open: function () {
		this.setState({ isShown: true });
	},
	close: function () {
		this.setState({ isShown: false });
	},
  render: function () {
    return (
      <Modal show={this.state.isShown} onHide={this.close} backdrop='static' keyboard={false} >
				<Modal.Header closeButton={true}>
					<Modal.Title>Nhắn tin đến {this.props.message.from.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<textarea className="textarea-private-reply" placeholder="Nhập tin nhắn" ref="message_text" rows={5}/>
				</Modal.Body>
				<Modal.Footer>
					<div className="private-rep-modal-footer-wrapper">
						<button type="button" className={"btn btn-primary private-rep-btn"}
							disabled={this.state.isDisabled}
							onClick={this.handleSendButton}>Gửi</button>
					</div>
				</Modal.Footer>
			</Modal>
    )
  }
});

module.exports = FmsPrivateReplyModal;