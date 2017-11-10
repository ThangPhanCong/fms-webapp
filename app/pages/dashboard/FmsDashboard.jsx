import React from 'react';
import { connect } from 'react-redux';

import FmsSpin from '../../components/FmsSpin';
import FmsConversationArea from './selectedConversation/FmsConversationArea';
import FmsClientList from './conversations/FmsClientList';
import FmsClientInformation from './information/FmsClientInformation';
import FmsVerticalNav from './FmsVerticalNav';

import { getProject, unSubscribeProjectChanges } from '../../actions/dashboard/conversations';
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
		const { dispatch } = this.props;
		const alias = this.props.match.params.project_alias;
		dispatch(getProject(alias));
		dispatch(getTagsProject(alias));
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		const alias = this.props.match.params.project_alias;
		dispatch(unSubscribeProjectChanges(alias));
	}

	renderConversation() {
		if (this.props.selectedConversation) {
			return <FmsConversationArea alias={this.props.match.params.project_alias} noti={this.props.noti} />
		} else {
			return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
		}
	}

	renderClientList() {
		if (this.props.isLoadingConvers == false) {
			return <FmsClientList alias={this.props.match.params.project_alias} />
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
		selectedConversation: state.dashboard.selectedConversation.chatArea.conversation,
		isLoadingConvers: state.dashboard.conversations.isLoadingConvers
  }
}

export default connect(mapStateToProps)(FmsDashBoard);
