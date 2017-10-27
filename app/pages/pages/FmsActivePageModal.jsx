import React from 'react';
import { Modal } from 'react-bootstrap';

import FmsPageItemInModal from 'FmsPageItemInModal';
import PagesAPI from 'PagesApi';
import FmsSpin from 'FmsSpin';
import * as socket from '../../socket';

class FmsActivePageModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShown: false,
			selectedPage: null,
			isDisabled: true,
			canSelect: true,
			loadingStatus: null
		}
		this.handleActiveButton = this.handleActiveButton.bind(this);
		this.handleClickOnPageInModal = this.handleClickOnPageInModal.bind(this);
		this.close = this.close.bind(this);
	}
	handleActiveButton() {
		let self = this;
		if (!this.state.selectedPage) return;

		let onUpdate = (data) => {
			console.log('onUpdate', data);

			let updateStatus = (status, i) => {
				const TIME_DELAY = 300; // miliseconds

				setTimeout(() => {
					self.setState({ loadingStatus: status });
				}, i * TIME_DELAY);
			}

			switch (data.type) {
				case 'inbox':
					let users = data.items;

					users.forEach((user, index) => {
						let _loadingStatus = 'Lấy hội thoại người dùng: ' + user;
						updateStatus(_loadingStatus, index);
					});

					break;
				case 'post':
					let titles = data.items;

					titles.map(title => {
						if (!title) return '';
						return (title.length > 39) ? (title.substring(0, 37) + '...') : title;
					})
						.forEach((title, index) => {
							let _loadingStatus = 'Lấy nội dung bài đăng: ' + title;
							updateStatus(_loadingStatus, index);
						});
					break;
			}
		};

		let onDone = (err, res) => {
			console.log('onDone', res);
			if (err) {
				alert(`Lỗi ${res.code}: ` + res.msg);
			}

			self.props.updatePages();
			self.close();
		};

		socket.activePage({
			page_fb_id: self.state.selectedPage.fb_id,
			onUpdate,
			onDone
		});

		this.setState({ isDisabled: true, canSelect: false });
	}
	handleClickOnPageInModal(isSelected, page_fb_id) {
		let inactive = this.props.inactive;
		for (let page of this.props.inactive) {
			if (page.fb_id == page_fb_id) {
				this.setState({
					selectedPage: (isSelected) ? page : null,
					isDisabled: !isSelected,
				});
			}
		}
	}
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
				onPageClick={self.handleClickOnPageInModal} isSelected={isSelected} canSelect={self.state.canSelect} />
		});
	}
	open() {
		this.setState({
			isShown: true,
			selectedPage: null,
			isDisabled: true,
			canSelect: true
		});
	}
	close() {
		this.setState({ isShown: false });
	}
	render() {
		let loadingStatus = '' + (this.state.loadingStatus || '');
		let statusHidden = !this.state.canSelect ? ' ' : ' fms-hidden';
		let canClose = this.state.canSelect;

		return (
			<Modal show={this.state.isShown} onHide={this.close} backdrop='static' keyboard={false} >
				<Modal.Header closeButton={canClose}>
					<Modal.Title>Choose pages to active</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.renderPagesInModal()}
				</Modal.Body>
				<Modal.Footer>
					<div className="pagemodal-footer-wrapper">
						<div className={"status " + statusHidden}>
							<FmsSpin size={34}></FmsSpin>
							<p className="text-status">{loadingStatus}</p>
						</div>
						<button type="button" className={"btn btn-primary active-btn"}
							disabled={this.state.isDisabled}
							onClick={this.handleActiveButton}>Active</button>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}
}

module.exports = FmsActivePageModal;
