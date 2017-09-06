'use strict';

const React = require('react');
const Modal = require('react-bootstrap').Modal;

let FmsPageItemInModal = require('FmsPageItemInModal');
let PagesAPI = require('PagesAPI');
let FmsSpin = require('FmsSpin');
let socket = require('Socket');

let FmsActivePageModal = React.createClass({
	getInitialState: function () {
		return {
			isShown: false,
			selectedPage: null,
			isDisabled: true,
			canSelect: true
		}
	},
	handleActiveButton: function () {
		let self = this;
		if (!this.state.selectedPage) return;

		// PagesAPI.activePage(this.state.selectedPage.fb_id, function () {
		// 	self.props.updatePages();
		// 	self.close();
		// });

		let onUpdate = (data) => {
			console.log('onUpdate', data);
		};

		let onDone = (err, data) => {
			console.log('onDone', data);
			if (!err) {
				self.props.updatePages();
				self.close();
			}
		};

		// use socket
		socket.activePage({
			page_fb_id: self.state.selectedPage.fb_id,
			onUpdate,
			onDone
		});

		this.setState({ isDisabled: true, canSelect: false });
	},
	handleClickOnPageInModal: function (isSelected, page_fb_id) {
		let inactive = this.props.inactive;
		for (let page of this.props.inactive) {
			if (page.fb_id == page_fb_id) {
				this.setState({
					selectedPage: (isSelected) ? page : null,
					isDisabled: !isSelected,
				});
			}
		}
	},
	renderPagesInModal() {
		let self = this;
		let pages = this.props.inactive;
		if (pages.length === 0) {
			return <p>All your pages is active. Nothing to show!</p>
		}
		return pages.map(function (page) {
			let isSelected = self.state.selectedPage && self.state.selectedPage.fb_id == page.fb_id
				&& self.state.selectedPage != null;
			return <FmsPageItemInModal data={page} key={page.fb_id}
				onPageClick={self.handleClickOnPageInModal} isSelected={isSelected} canSelect={self.state.canSelect}/>
		});
	},
	open: function () {
		this.setState({
			isShown: true,
			selectedPage: null,
			isDisabled: true,
			canSelect: true
		});
	},
	close: function () {
		this.setState({ isShown: false });
	},
	render: function () {
		return (
			<Modal show={this.state.isShown} onHide={this.close} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>Choose pages to active</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.renderPagesInModal()}
				</Modal.Body>
				<Modal.Footer>
					<div className="pagemodal-footer-wrapper">
						<FmsSpin></FmsSpin>
						<button type="button" className={"btn btn-primary"}
							disabled={this.state.isDisabled}
							onClick={this.handleActiveButton}>Active</button>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = FmsActivePageModal;
