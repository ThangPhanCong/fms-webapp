'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const searchImg = require('search.png');
let FmsClientItem = require('FmsClientItem');
let DashboardAPI = require('DashboardApi');
let FmsSpin = require('FmsSpin');
let FmsFilterTags = require('FmsFilterTags');

let FmsClientList = React.createClass({
	getInitialState: function() {
		return {
			showSpin: false
		}
	},
	getDefaultProps: function () {
		return {
			conversations: [],
			currentConversation: null,
			allConversations: [],
			paging: null
		}
	},
	handleClientClick: function(fb_id, type) {
		this.props.handleClientClick(fb_id, type);
	},
	loadMoreConversations: function () {
		if (this.state.showSpin == true || !this.props.paging) return;
		this.setState({ showSpin: true });
		DashboardAPI.getConversations(this.props.alias, this.props.paging).then((res) => {
			let paging = (res.paging) ? res.paging.next : null;
			this.props.displayMoreConversations(res.data, paging);
			this.setState({ showSpin: false });
		}, (err) => {
			this.setState({ showSpin: false });
			throw new Error(err);
		});
	},
	componentDidMount: function () {
		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 64) {
				this.loadMoreConversations();
			}
		})
	},
	render: function () {
		let self = this;

		let renderClients = function () {
			let conversations = self.props.conversations;
			if (!conversations) return;

			return conversations.map(conversation => {
				let isSelected = (self.props.currentConversation && self.props.currentConversation.fb_id == conversation.fb_id);
				return <FmsClientItem data={conversation} key={conversation.fb_id} handleClientClick={self.handleClientClick} isSelected={isSelected}/>
			});
		};

		let showSpin = (this.state.showSpin == true) ? "" : " hide";

		return (
			<div className="client-list-wrapper">
				<div className="search-client">
					<img src={searchImg} className="search-icon"/>
					<input type="text" className="input-search-client" />
					<FmsFilterTags tags={this.props.tags} handleFilter={this.props.handleFilter}
								filters={this.props.filters}/>
				</div>
				<div ref="list" className="scroll-list">
					<div>
						{renderClients()}
					</div>
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27}/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientList;
