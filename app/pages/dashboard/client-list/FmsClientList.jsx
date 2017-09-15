'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const searchImg = require('search.png');
let FmsClientItem = require('FmsClientItem');
let DashboardAPI = require('DashboardAPI');
let FmsSpin = require('FmsSpin');

let count = 0;

let FmsClientList = React.createClass({
	getInitialState: function() {
		return {
			showSpin: false
		}
	},
	getDefaultProps: function () {
		return {
			conversations: [],
			currentConversation: null
		}
	},
	handleClientClick: function(fb_id, type) {
		this.props.handleClientClick(fb_id, type);
	},
	loadMoreConversations: function () {
		if (count != 0) return;
		count++;
		let newConversations = this.props.conversations.concat(DashboardAPI.getMoreConversations());
		this.setState({ showSpin: true });
		setTimeout(() => {
			this.setState({
				showSpin: false
			});
			this.props.displayMoreConversations(newConversations);
		}, 3000);
	},
	componentDidMount: function () {
		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 32) {
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
			<div ref="list" className="scroll-list">
				<div className="search-client">
					<img src={searchImg} className="search-icon"/>
					<input type="text" className="input-search-client" />
				</div>
				<div>
					{renderClients()}
				</div>
				<div className={"client-list-spin" + showSpin}>
					<FmsSpin size={27}/>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientList;
