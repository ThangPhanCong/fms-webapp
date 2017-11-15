import React from 'react';
import { connect } from 'react-redux';

import FmsSpin from '../../components/FmsSpin';
import FmsChatArea from './selectedConversation/FmsChatArea';
import FmsConversationList from './conversations/FmsConversationList';
import FmsClientInformation from './information/FmsClientInformation';
import FmsVerticalNav from './FmsVerticalNav';

import { setAlias } from '../../actions/dashboard/conversations';
import { getProject, unSubscribeProjectChanges } from '../../actions/dashboard/dashboard';
import { getTagsProject } from '../../actions/dashboard/filters';

class FmsDashBoard extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		const alias = this.props.match.params.project_alias;
		dispatch(setAlias(alias));
		dispatch(getProject(alias));
		dispatch(getTagsProject(alias));
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		const alias = this.props.match.params.project_alias;
		dispatch(unSubscribeProjectChanges(alias));
	}

	renderConversation() {
		if (this.props.conversation) {
			return <FmsChatArea />
		} else {
			return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
		}
	}

	renderClientList() {
		if (this.props.isLoadingConversations == false) {
			return <FmsConversationList />
		} else {
			return <div className="client-list-spin"><FmsSpin size={27} /></div>
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
		isLoadingConversations: state.dashboard.conversations.isLoadingConversations
  }
}

export default connect(mapStateToProps)(FmsDashBoard);
