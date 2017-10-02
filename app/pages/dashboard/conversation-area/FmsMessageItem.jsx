'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const uuid = require('uuid');
const rightArrowImg = require('right_arrow.png');
const leftArrowImg = require('left_arrow.png');

let FmsAttachmentContent = require('FmsAttachmentContent');
let FmsTextMessageContent = require('FmsTextMessageContent');
let DashboardAPI = require('DashboardAPI');

let FmsMessageItem = React.createClass({
	attachmentLoadDone: function () {
		this.props.attachmentLoadDone();
	},

	convertTime: function (time) {
		let date = new Date(time);
		let hour = (date.getHours() > 9) ? date.getHours() : "0" + date.getHours();
		let minute = (date.getMinutes() > 9) ? date.getMinutes() : "0" + date.getMinutes();
		let day;
		switch (date.getDay()) {
			case 0: day = "Sunday"; break;
			case 1: day = "Monday"; break;
			case 2: day = "Tuesday"; break;
			case 3: day = "Wednesday"; break;
			case 4: day = "Thurday"; break;
			case 5: day = "Friday"; break;
			case 6: day = "Saturday"; break;
		};
		return day + " " + hour + ":" + minute;
	},
	componentDidMount: function () {
		$(ReactDOM.findDOMNode(this.refs.tooltip)).ready(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
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
		let sent_time = this.convertTime(this.props.message.updated_time);
		let direction = (isSelf) ? "right" : "left";

		function renderAttachment() {
			let msg = self.props.message;
			let hasMessage = (self.props.message.message == "") ? -1 : 1;
			let msgType = self.props.type;
			let attachmentData = null;

			if (msg.shares && msg.shares.data.length > 0) {
				return msg.shares.data.map((share) => {
					if (share.link && share.link.indexOf("scontent") != -1) {
						return <FmsAttachmentContent key={uuid()} preview={share.link} isSelf={isSelf}
							type={'sticker'} attachmentLoadDone={self.attachmentLoadDone} />
					}
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
					if (attachType == 'unknown' || preview == '') return;
					return <FmsAttachmentContent key={uuid()} hasMessage={hasMessage} type={attachType} origin={origin}
						isSelf={isSelf} attachmentLoadDone={self.attachmentLoadDone} preview={preview} />
				})
			}
		}

		return (
			<div className={"message-item" + isLast}>
				<div className={"message-wrapper" + messageWrapper} ref="tooltip" data-toggle="tooltip"
					title={sent_time} data-placement={direction}>
					<div className={"profile-wrapper" + profileWrapper}>
						<a href={userFb} target="_blank"><img src={avaUrl} className="profile-message" /></a>
					</div>
					<img src={srcArrow} className={arrow} />
					<div className={"message-content" + messageContent}>
						<FmsTextMessageContent content={this.props.message.message} />
					</div>
				</div>
				{renderAttachment()}
			</div>
		);
	}
});

module.exports = FmsMessageItem;
