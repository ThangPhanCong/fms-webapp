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
			let msgType = self.props.type;
			let attachmentData = null;

			if (msg.shares && msg.shares.data.length > 0) {
				return msg.shares.data.map((share) => {
					let imgSrc = (share.link && share.link.indexOf("scontent") != -1) ? share.link : "";
					return <FmsAttachmentContent key={uuid()} preview={imgSrc} isSelf={isSelf}
								type={'sticker'} attachmentLoadDone={self.attachmentLoadDone}/>
				});
			}

			if (msgType == 'inbox' && msg.attachments && msg.attachments.data.length > 0) {
				attachmentData = msg.attachments.data;
			} else if (msgType == 'comment' && msg.attachment) {
				attachmentData = [msg.attachment];
			}

			if (attachmentData) {
				let index = 0;
				return attachmentData.map(attachment => {
					index++;
					if (index > 1) hasMessage = 0;
					let attachType = 'unknown', preview = '', origin;
					if (attachment.type) {
						let t = attachment.type;
						if (t == 'sticker') attachType = 'sticker';
						else if (t == 'photo' || t == 'video_inline') attachType = 'image';
						preview = attachment.media.image.src;
						if (t != 'sticker') origin = attachment.url;
					}
					else {
						let t = attachment.mime_type;
						if (t == "image/jpeg" || t == "image/gif") {
							attachType = 'image';
							preview = attachment.image_data.preview_url;
							origin = attachment.image_data.url;
						} else if (t == "video/mp4") {
							attachType = 'image';
							preview = attachment.video_data.preview_url;
							origin = attachment.video_data.url;
						}
					}
					
					return <FmsAttachmentContent key={uuid()} hasMessage={hasMessage} type={attachType} origin={origin}
									isSelf={isSelf} attachmentLoadDone={self.attachmentLoadDone} preview={preview}/>
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
          <div className={"message-content fms-tooltip" + messageContent}>
					  <FmsTextMessageContent content={this.props.message.message}/>
						<span className="fms-tooltiptext">Tooltip text</span>
          </div>
				</div>
				{renderAttachment()}
			</div>
		);
	}
});

module.exports = FmsMessageItem;
