

import React from 'react';
import inboxImg from 'inbox.png';
import postImg from 'post.png';
import { Image } from 'react-bootstrap';
import uuid from 'uuid';

const ICON_HEIGHT = 16;

class FmsClientItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClientClick = this.handleClientClick.bind(this);
	}
	handleClientClick() {
		this.props.handleClientClick(this.props.data, this.props.data.type);
	}
	renderIconType() {
		let self = this;
		let icons = [];
		let conversationIcon = self.props.data.type == 'inbox' ? <img className="icon-type" key={uuid()} src={inboxImg} /> : <img className="icon-type" key={uuid()} src={postImg} />;
		icons.push(conversationIcon);

		let tagIcons = self.props.data.tags.map(t => {
			let tagStyled = {
				backgroundColor: t.color,
			}
			return <span className="client-item-tag" key={uuid()} style={tagStyled}></span>
		})
		icons = icons.concat(tagIcons);

		return icons;
	}
	render() {
		let self = this;
		let clientid, clientName, message;
		let isSelected = (this.props.isSelected) ? " selectedItem" : "";

		if (this.props.data.type == "inbox") {
			clientid = this.props.data.customer.id;
			clientName = this.props.data.customer.name;
		} else {
			clientid = this.props.data.from.id;
			clientName = this.props.data.from.name;
		}
		message = (this.props.data.snippet == "") ? "[Attachment]" : this.props.data.snippet;

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
					<div className="client-item-tags">
						{self.renderIconType()}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = FmsClientItem;
