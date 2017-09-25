'use strict';

const React = require('react');
const uuid = require('uuid');
const rightArrowImg = require('right_arrow.png');
const leftArrowImg = require('left_arrow.png');

let FmsAttachmentContent = require('FmsAttachmentContent');
let FmsTextMessageContent = require('FmsTextMessageContent');

let FmsMessageItem = React.createClass({
	attachmentLoadDone: function () {
		this.props.attachmentLoadDone();
	},
	render: function () {
		let self = this;

		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.from.id}/picture`;
		let userFb = `https://facebook.com/${this.props.message.from.id}`;
		let isSelf = this.props.isSelf;
    let messageWrapper = (isSelf) ? " right-message-wrapper" : " left-message-wrapper";
		let profileWrapper = (isSelf) ? " right-profile-wrapper" : " left-profile-wrapper";
		let messageContent = (isSelf) ? " right-message-content" : " left-message-content";
		let srcArrow = (isSelf) ? rightArrowImg : leftArrowImg;
		let arrow = (isSelf) ? " right-arrow-message" : " left-arrow-message";
		let isLast = (this.props.isLast) ? " last-message" : "";
		messageContent += (this.props.message.message == "" ? " hide" : "");
		arrow += (this.props.message.message == "") ? " hide" : "";

		function renderAttachment() {
			let msg = self.props.message;
			let hasMessage = (self.props.message.message == "") ? -1 : 1;
			let conversationType = self.props.type;
			let attachmentData = null;

			if (msg.shares && msg.shares.data.length > 0) {
				return msg.shares.data.map((share) => {
					let imgSrc = (share.link) ? share.link : "";
					return <FmsAttachmentContent key={uuid()} stickerSrc={imgSrc} isSelf={isSelf}
								attachmentLoadDone={self.attachmentLoadDone}/>
				});
			}

			if (conversationType == 'inbox' && msg.attachments && msg.attachments.data.length > 0) {
				attachmentData = msg.attachments.data;
			} else if (conversationType == 'comment' && msg.attachment) {
				attachmentData = [msg.attachment];
			}

			if (attachmentData) {
				let index = 0;
				return attachmentData.map(attachment => {
					index++;
					if (index > 1) hasMessage = 0;
					return <FmsAttachmentContent key={uuid()} index={index} hasMessage={hasMessage} 
									conversationType={conversationType} data={attachment} isSelf={isSelf} attachmentLoadDone={self.attachmentLoadDone}/>
				})
			}
		}

		return (
			<div className={"message-item" + isLast}>
				<div className={"message-wrapper" + messageWrapper}>
          <div className={"profile-wrapper" + profileWrapper}>
					  <a href={userFb} target="_blank"><img src={avaUrl} className="profile-message" /></a>
          </div>
					<img src={srcArrow} className={arrow}/>
          <div className={"message-content" + messageContent}>
					  <FmsTextMessageContent content={this.props.message.message}/>
          </div>
				</div>
				{renderAttachment()}
			</div>
		);
	}
});

module.exports = FmsMessageItem;
