import React from 'react';
import { connect } from 'react-redux';
import inboxImg from '../../../images/inbox.png';
import postImg from '../../../images/post.png';
import { Image } from 'react-bootstrap';
import uuid from 'uuid';

import { handleConversationClick } from '../../../actions/dashboard/conversations';

const ICON_HEIGHT = 16;

class FmsConversationItem extends React.Component {
	handleConversationClick() {
		let { dispatch, data } = this.props;
		dispatch(handleConversationClick(data, data.type));
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
		let data = this.props.data;
		let clientid, clientName, message;
		let isSelected = (this.props.isSelected) ? " selectedItem" : "";

		if (data.type == "inbox") {
			clientid = data.customer.fb_id;
			clientName = data.customer.name;
		} else {
			clientid = data.from.id;
			clientName = data.from.name;
		}
		message = (data.snippet == "") ? "[Attachment]" : data.snippet;

		let seenClass = data.is_seen ? '' : ' not-seen';

		let avaUrl = `https://graph.facebook.com/v2.10/${clientid}/picture`;
		return (
			<div className={"client-item" + isSelected} onClick={this.handleConversationClick.bind(this)}>
				<div className="client-profile-wrapper">
					<img src={avaUrl} className="client-profile" />
				</div>
				<div className="name-and-message">
					<div className={"client-name " + seenClass}>{clientName}</div>
					<div className={"lastest-message " + seenClass}>{message}</div>
					<div className="client-item-tags">
						{this.renderIconType()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(FmsConversationItem);
