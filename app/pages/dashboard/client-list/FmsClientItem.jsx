'use strict';

const React = require('react');
const inboxImg = require('inbox.png');
const postImg = require('post.png');
import {Image} from 'react-bootstrap';
import uuid from 'uuid';

const ICON_HEIGHT = 16;

let FmsClientItem = React.createClass({
	handleClientClick: function () {
		this.props.handleClientClick(this.props.data.fb_id, this.props.data.type);
	},
	renderIconType: function () {
		let self = this;
		let icons = [];

		// render inbox || comment
		let conversationIcon = self.props.data.type == 'inbox' ? <Image key={uuid()} src={inboxImg}></Image> : <Image key={uuid()} src={postImg}></Image>;
		icons.push(conversationIcon);

		// render tags
		// let tags = [{_id: '234234', color: 'black'}, {_id: '2342sdf34', color: 'red'}, {_id: '234sdf234', color: 'gray'}]
		// let tagIcons = tags.map(t => {
		// 	let tagStyled = {
		// 		backgroundColor: t.color,
		// 		width: ICON_HEIGHT + 'px',
		// 		height: ICON_HEIGHT + 'px',
		// 		borderRadius: '50%'
		// 	}
		// 	return <span key={t._id} style={tagStyled}></span>
		// })
		// icons = icons.concat(tagIcons);

		return icons;
	},
	render: function () {
		let self = this;
		let clientid, clientName, message;
		let isSelected = (this.props.isSelected) ? " selectedItem" : "";

		clientid = this.props.data.customer.fb_id;
		clientName = this.props.data.customer.name;
		message = this.props.data.snippet;

		let seenClass = this.props.data.is_seen ? '' : ' not-seen';

		let avaUrl = `https://graph.facebook.com/v2.10/${clientid}/picture`;
		return (
			<div className={"client-item" + isSelected} onClick={this.handleClientClick}>
				<div className="client-profile-wrapper">
					<img src={avaUrl} className="client-profile" />
				</div>
				<div className="name-and-message">
					<div className={"client-name " + seenClass}>{clientName}</div>
					<div className={"lastest-message " + seenClass}>{message}</div>
					<div className="icon-type">
						{self.renderIconType()}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientItem;
