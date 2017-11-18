import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import searchImg from '../../../images/search.png';
import FmsConversationItem from './FmsConversationItem';
import DashboardAPI from '../../../api/DashboardApi';
import FmsSpin from '../../../components/FmsSpin';
import FmsFilterTags from './FmsFilterTags';

import { loadMoreConversations, getConversations } from '../../../actions/dashboard/conversations';
import { setSearchText } from '../../../actions/dashboard/filters';

let timeout;

class FmsConversationList extends React.Component {
	handleSearchChange() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			let { dispatch, alias } = this.props;
			dispatch(setSearchText(this.refs.searchText.value));
			dispatch(getConversations(alias));
		}, 800);
	}
	componentDidMount() {
		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 64) {
				this.props.dispatch(loadMoreConversations());
			}
		})
	}

	renderConversations() {
		let self = this;
		let conversations = this.props.conversations;
		if (!conversations) return;
		return conversations.map(conversation => {
			let isSelected = (self.props.conversation && self.props.conversation._id == conversation._id);
			return <FmsConversationItem key={uuid()} data={conversation} isSelected={isSelected} />
		});
	}

	render() {
		let showSpin = (this.props.isLoadingConversations == true) ? "" : " hide";

		return (
			<div className="client-list-wrapper">
				<div className="search-client">
					<img src={searchImg} className="search-icon" />
					<input type="text" className="input-search-client" ref="searchText" 
						onChange={this.handleSearchChange.bind(this)} defaultValue={this.props.searchText}/>
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
		alias: state.dashboard.conversations.alias,
		conversations: state.dashboard.conversations.conversations,
		conversation: state.dashboard.chat.conversation,
		isLoadingConversations: state.dashboard.conversations.isLoadingConversations,
		searchText: state.dashboard.filters.searchText
  }
}

export default connect(mapStateToProps)(FmsConversationList);
