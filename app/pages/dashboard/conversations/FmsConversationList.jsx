import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import searchImg from '../../../images/search.png';
import FmsConversationItem from './FmsConversationItem';
import DashboardAPI from '../../../api/DashboardApi';
import FmsSpin from '../../../components/FmsSpin';
import FmsFilterTags from './FmsFilterTags';

import { loadMoreConversations } from '../../../actions/dashboard/conversations';

class FmsConversationList extends React.Component {
	componentDidMount() {
		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 64) {
				this.props.dispatch(loadMoreConversations(this.props.alias));
			}
		})
	}

	renderConversations() {
		let self = this;
		let conversations = this.props.filteredConversations;
		if (!conversations) return;
		return conversations.map(conversation => {
			let isSelected = (self.props.conversation && self.props.conversation._id == conversation._id);
			return <FmsConversationItem key={uuid()} data={conversation} isSelected={isSelected} />
		});
	}

	render() {
		let showSpin = (this.props.isLoadMoreConversations == true) ? "" : " hide";

		return (
			<div className="client-list-wrapper">
				<div className="search-client">
					<img src={searchImg} className="search-icon" />
					<input type="text" className="input-search-client" />
					<FmsFilterTags />
				</div>
				<div ref="list" className="scroll-list">
					<div>
						{this.renderConversations()}
					</div>
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
		filteredConversations: state.dashboard.conversations.filteredConversations,
		conversation: state.dashboard.chat.conversation,
		isLoadMoreConversations: state.dashboard.conversations.isLoadMoreConversations
  }
}

export default connect(mapStateToProps)(FmsConversationList);
