import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import FmsAttachmentContent from './FmsAttachmentContent';
import FmsTextMessageContent from './FmsTextMessageContent';
import DashboardAPI from '../../../api/DashboardApi';

class FmsMessageItem extends React.Component {
	convertTime(time) {
		let date = new Date(time);
		let hour = (date.getHours() > 9) ? date.getHours() : "0" + date.getHours();
		let minute = (date.getMinutes() > 9) ? date.getMinutes() : "0" + date.getMinutes();
		let day = "";
		// switch (date.getDay()) {
		// 	case 0: day = "Sunday"; break;
		// 	case 1: day = "Monday"; break;
		// 	case 2: day = "Tuesday"; break;
		// 	case 3: day = "Wednesday"; break;
		// 	case 4: day = "Thurday"; break;
		// 	case 5: day = "Friday"; break;
		// 	case 6: day = "Saturday"; break;
		// };
		return day + " " + hour + ":" + minute;
	}
	render() {
		let self = this;
		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.from.fb_id}/picture`;
		let userFb = `https://facebook.com/${this.props.message.from.fb_id}`;
		let isSelf = this.props.isSelf;
		let messageWrapper = (isSelf) ? " right-message-wrapper" : " left-message-wrapper";
		let profileWrapper = (isSelf) ? " right-profile-wrapper" : " left-profile-wrapper";
		let messageContent = (isSelf) ? " right-message-content" : " left-message-content";
		let isLast = (this.props.isLast) ? " last-message" : "";
		messageContent += (this.props.message.message == "" ? " hide" : "");
		let sent_time = this.convertTime(this.props.message.updated_time);
		let direction = (isSelf) ? "right" : "left";

		function renderAttachment() {
			let msg = self.props.message;
			let hasMessage = (self.props.message.message == "") ? -1 : 1;
			let msgType = self.props.type;
			let attachmentData = null;

			if (msg.shares && msg.shares.length > 0) {
				return msg.shares.map((share) => {
					if (share.link && share.link.indexOf("scontent") != -1) {
						return <FmsAttachmentContent key={uuid()} preview={share.link} isSelf={isSelf} type={'sticker'} />
					}
				});
			}
			if (msgType == 'inbox' && msg.attachments && msg.attachments.length > 0) {
				attachmentData = msg.attachments;
			} else if (msgType == 'comment' && msg.attachment) {
				attachmentData = [msg.attachment];
			}
			if (attachmentData) {
				let index = 0;
				return attachmentData.map(attachment => {
					index++;
					if (index > 1) hasMessage = 0;
					let attachType = 'unknown', preview = '', origin;
					let size = { width: 0, height: 0 };
					if (attachment.type) {
						let t = attachment.type;
						if (t == 'sticker') attachType = 'sticker';
						else if (t == 'photo' || t == 'video_inline' || t == 'share') attachType = 'image';
						preview = attachment.media.image.src;
						size.width = attachment.media.image.width;
						size.height = attachment.media.image.height;
						if (t != 'sticker') origin = attachment.url;
					}
					else {
						let t = attachment.mime_type;
						if (t == "image/jpeg" || t == "image/gif") {
							attachType = 'image';
							preview = attachment.image_data.preview_url;
							origin = attachment.image_data.url;
							size.width = attachment.image_data.width;
							size.height = attachment.image_data.height;
						} else if (t == "video/mp4") {
							attachType = 'image';
							preview = attachment.video_data.preview_url;
							origin = attachment.video_data.url;
							size.width = attachment.video_data.width;
							size.height = attachment.video_data.height;
						}
					}
					if (attachType == 'unknown' || preview == '') return;
					return <FmsAttachmentContent key={uuid()} hasMessage={hasMessage} type={attachType} origin={origin}
									isSelf={isSelf} preview={preview} size={size} getChatAreaWidth={self.props.getChatAreaWidth}/>
				})
			}
		}
		let actionButton = (this.props.isSelf == false && this.props.type == "comment") ? true : false;
		let firstMsg = (this.props.isFirst == " is-first") ? "" : " hide";
		let sentTime = (this.props.isSelf == true) ? " right-sent-time" : " left-sent-time";
		const tooltip = (
			<Tooltip id="tooltip">{this.props.message.from.name}</Tooltip>
		);

		return (
			<div className={"message-item" + isLast + this.props.isFirst}>
				<div className={"sent-time" + firstMsg + sentTime}>{sent_time}</div>
				<div className={"message-wrapper" + messageWrapper}>
					<div className={"profile-wrapper" + profileWrapper}>
						<OverlayTrigger placement={(isSelf) ? "right" : "left"} overlay={tooltip}>
							<a href={userFb} target="_blank"><img src={avaUrl} className={"profile-message" + firstMsg} /></a>
						</OverlayTrigger>
					</div>
					<div className={"message-content" + messageContent}>
						<FmsTextMessageContent message={this.props.message} actionButton={actionButton} />
					</div>
				</div>
				{renderAttachment()}
			</div>
		);
	}
}

module.exports = FmsMessageItem;
