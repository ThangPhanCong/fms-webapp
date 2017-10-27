'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import searchImg from 'search.png';
import FmsClientItem from 'FmsClientItem';
import DashboardAPI from 'DashboardApi';
import FmsSpin from 'FmsSpin';
import FmsFilterTags from 'FmsFilterTags';

class FmsClientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSpin: false
		}
		this.handleClientClick = this.handleClientClick.bind(this);
	}
	handleClientClick(fb_id, type) {
		this.props.handleClientClick(fb_id, type);
	}
	isShowAll() {
		let filters = this.props.filters.filter((filter) => {
			return filter.isActive;
		});
		return filters.length == 1 && filters[0].type == 'all';
	}
	loadMoreConversations() {
		if (this.state.showSpin == true || !this.props.paging) return;
		if (!this.isShowAll()) return;
		this.setState({ showSpin: true });
		DashboardAPI.getConversations(this.props.alias, this.props.paging).then((res) => {
			let paging = (res.paging) ? res.paging.next : null;
			this.props.displayMoreConversations(res.data, paging);
			this.setState({ showSpin: false });
		}, (err) => {
			this.setState({ showSpin: false });
			throw new Error(err);
		});
	}
	componentDidMount() {
		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 64) {
				this.loadMoreConversations();
			}
		})
	}
	render() {
		let self = this;

		let renderClients = function () {
			let conversations = self.props.conversations;
			if (!conversations) return;

			return conversations.map(conversation => {
				let isSelected = (self.props.currentConversation && self.props.currentConversation._id == conversation._id);
				return <FmsClientItem data={conversation} key={conversation._id} handleClientClick={self.handleClientClick} isSelected={isSelected} />
			});
		};

		let showSpin = (this.state.showSpin == true) ? "" : " hide";

		return (
			<div className="client-list-wrapper">
				<div className="search-client">
					<img src={searchImg} className="search-icon" />
					<input type="text" className="input-search-client" />
					<FmsFilterTags tags={this.props.tags} handleFilter={this.props.handleFilter}
						filters={this.props.filters} />
				</div>
				<div ref="list" className="scroll-list">
					<div>
						{renderClients()}
					</div>
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27} />
					</div>
				</div>
			</div>
		);
	}
}
FmsClientList.defaultProps = {
	conversations: [],
	currentConversation: null,
	allConversations: [],
	paging: null
}

module.exports = FmsClientList;
