import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {isShowModal,activePages } from "../../../actions/setting/setting-page";
import FmsPageItemInModal from './FmsPageItemInModal';
import FmsSpin from '../../../components/FmsSpin';

class FmsPageModal extends Component {
  handleActivePages() {
    const {project_alias} = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(activePages(project_alias));
  }
  closeModal() {
    const {dispatch} = this.props;
    dispatch(isShowModal());
  }
  renderPageItems() {
    const { selectedPagesModal, isSendingRequest, pagesModal} = this.props;

    if (Array.isArray(pagesModal) && pagesModal.length > 0) {
      return pagesModal.map(page => {
        let isSelected = selectedPagesModal && (selectedPagesModal.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect = !isSendingRequest || true;

        return (
          <FmsPageItemInModal data={page} key={page.fb_id} isSelected={isSelected} canSelect={canSelect} />
        )
      })
    } else {
      return (
        <div>Bạn không có trang nào!</div>
      )
    }
  }

  renderActivePages() {
    const { dispatch } = this.props;
    let disabled = this.props.isSendingRequest;
    let selectedPagesModal = this.props.selectedPagesModal;
    let loadingStatus = '' + (this.props.loadingStatus || '');
    let statusHidden = this.props.isSendingRequest ? ' ' : ' fms-hidden';
    return (
      <div className="add-project-modal">
        <Modal.Header closeButton={!disabled}>
          <Modal.Title>Thêm trang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderPageItems()}
        </Modal.Body>
        <Modal.Footer>
          <div className="pagemodal-footer-wrapper">
            <div className={"status " + statusHidden}>
              <FmsSpin size={34}></FmsSpin>
              <p className="text-status">{loadingStatus}</p>
            </div>
            <button type="button" className={"btn btn-primary active-btn"}
              disabled={disabled || !selectedPagesModal || !Array.isArray(selectedPagesModal) || selectedPagesModal.length == 0}
              onClick={this.handleActivePages.bind(this)}>Thêm</button>
          </div>
        </Modal.Footer>
      </div>
    )
  }

  render() {
    return (
      <Modal show={this.props.isShowModal} onHide={this.closeModal.bind(this)} backdrop='static' keyboard={false} >
        {this.renderActivePages()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowModal: state.setting.settingPage.isShowModal,
    selectedPagesModal: state.setting.settingPage.selectedPagesModal,
    loadingStatus: state.setting.settingPage.loadingStatus,
    isSendingRequest: state.setting.settingPage.isSendingRequest,
    pagesModal: state.setting.settingPage.pagesModal
  }
}

export default withRouter(connect(mapStateToProps)(FmsPageModal));
