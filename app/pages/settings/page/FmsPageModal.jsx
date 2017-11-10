import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {getPagesProject, selectPage, isShowModal, getPages} from "../../../actions/setting";
import FmsPageItemInModal from './FmsPageItemInModal';
import FmsSpin from '../../../components/FmsSpin';

class FmsPageModal extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getPages());
    dispatch(getPagesProject());
  }
  closeModal() {
    let { dispatch } = this.props;
    dispatch(closeModal());
  }

  activePages() {
    let { dispatch } = this.props;
    dispatch(activePages());
  }
  closeModal() {
    const {dispatch} = this.props;
    dispatch(isShowModal());
  }
  renderPageItems() {
    let self = this;
    let { allPages, selectedPages, isSendingRequest, pages } = this.props;
    console.log("pages la ", pages);
    console.log("allPages la ", allPages);
    if (Array.isArray(allPages) && allPages.length > 0) {
      let listpages = allPages.filter(page => !pages.includes(page));
      console.log("listpages la ", listpages);
      allPages= listpages;
      return allPages.map(page => {
        let isSelected = selectedPages && (selectedPages.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect = true;

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
    let selectedPages = this.props.selectedPages;
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
              disabled={disabled || !selectedPages || !Array.isArray(selectedPages) || selectedPages.length == 0}
              onClick={this.activePages.bind(this)}>Thêm</button>
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
    isShowModal: state.setting.isShowModal,
    allPages: state.setting.allPages,
    pages: state.setting.pages,
    selectedPages: state.setting.selectedPages
  }
}

export default connect(mapStateToProps)(FmsPageModal);
