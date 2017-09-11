'use strict';

const React = require('react');
const rightArrowImg = require('right_arrow.png');
const leftArrowImg = require('left_arrow.png');

let FmsAttachmentContent = require('FmsAttachmentContent');
let FmsTextMessageContent = require('FmsTextMessageContent');

let FmsMessageItem = React.createClass({
	render: function () {
let self = this;

		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.from.id}/picture`;
		let isSelf = this.props.isSelf;
    let messageWrapper = (isSelf) ? " right-message-wrapper" : " left-message-wrapper";
		let profileWrapper = (isSelf) ? " right-profile-wrapper" : " left-profile-wrapper";
		let messageContent = (isSelf) ? " right-message-content" : " left-message-content";
		let srcArrow = (isSelf) ? rightArrowImg : leftArrowImg;
		let arrow = (isSelf) ? " right-arrow-message" : " left-arrow-message";
		let isLast = (this.props.isLast) ? " last-message" : "";
		function renderAttachment() {
				//return <FmsAttachmentContent attachSrc={self.props.message.attach} isSelf={isSelf}/>
		}
		return (
			<div className={"message-item" + isLast}>
				<div className={"message-wrapper" + messageWrapper}>
          <div className={"profile-wrapper" + profileWrapper}>
					  <img src={avaUrl} className="profile-message" />
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
