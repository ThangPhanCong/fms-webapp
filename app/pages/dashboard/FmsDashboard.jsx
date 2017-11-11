import React from 'react';
import { connect } from 'react-redux';

import FmsSpin from '../../components/FmsSpin';
import FmsChatArea from './selectedConversation/FmsChatArea';
import FmsConversationList from './conversations/FmsConversationList';
import FmsClientInformation from './information/FmsClientInformation';
import FmsVerticalNav from './FmsVerticalNav';

import { getProject } from '../../actions/dashboard/dashboard';
import { getTagsProject } from '../../actions/dashboard/filters';

class FmsDashBoard extends React.Component {
	// reloadAttachment(msgs) {
	// 	msgs.forEach((msg) => {
	// 		if (msg.shares) {
	// 			DashboardApi.getMessageShare(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.shares = res.data.shares;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		} else if (msg.attachment && (msg.attachment.type == 'sticker' || msg.attachment.type == 'photo' ||
	// 			msg.attachment.type == 'video_inline' || msg.attachment.type == 'share')) {
	// 			DashboardApi.getCommentAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.attachment = res.data.attachment;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		} else if (msg.attachments) {
	// 			DashboardApi.getMessageAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.attachments = res.data.attachments;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		}
	// 	});
	// }

	componentDidMount() {
		let { dispatch } = this.props;
		let alias = this.props.match.params.project_alias;
		dispatch(getProject(alias));
		dispatch(getTagsProject(alias));
	}

	renderConversation() {
		if (this.props.conversation) {
			return <FmsChatArea alias={this.props.match.params.project_alias} noti={this.props.noti} />
		} else {
			return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
		}
	}

	renderClientList() {
		if (this.props.loadingConversations == false) {
			return <FmsConversationList alias={this.props.match.params.project_alias} />
		} else {
			return <div className="client-list-spin" style={{marginTop: 32 + 'px'}}><FmsSpin size={27} /></div>
		}
	}

	render() {
		return (
			<div className="dashboard page">
				<div className="vertical-nav">
					<FmsVerticalNav />
				</div>
				<div className="client-list">
					{this.renderClientList()}
				</div>
				<div className="conversation-area">
					{this.renderConversation()}
				</div>
				<div className="client-information-area">
					<FmsClientInformation />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
		conversation: state.dashboard.chat.conversation,
		loadingConversations: state.dashboard.conversations.loadingConversations
  }
}

export default connect(mapStateToProps)(FmsDashBoard);