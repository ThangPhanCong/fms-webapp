import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import FmsPageItemInModal from './FmsPageItemInModal';
import FmsSpin from '../../components/FmsSpin';
import projectApi from '../../api/ProjectApi';
import pagesApi from '../../api/PagesApi';
import { closeModal, createNewProject, activePages } from '../../actions/project/projectModal';

class FmsAddProjectModal extends Component {
  requestNewProject() {
    let name = this.refs.projectName.value;
    const { dispatch } = this.props;
    dispatch(createNewProject(name));
  }

  closeModal() {
    let { dispatch } = this.props;
    dispatch(closeModal());
  }

  activePages() {
    let { dispatch } = this.props;
    dispatch(activePages());
  }

  renderCreateNewProject() {
    const disabled = this.props.isSendingRequest;

    return (
      <div className="add-project-modal">
        <Modal.Header closeButton={!disabled}>
          <Modal.Title>Tạo dự án mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="project-name">Tên dự án:</label>
            <input type="project-name" className="form-control" ref="projectName" id="project-name"></input>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button type="button" className={"btn btn-primary active-btn"} onClick={this.requestNewProject.bind(this)} disabled={disabled}>Tiếp tục</button>
        </Modal.Footer>
      </div>
    )
  }

  renderPageItems() {
    let self = this;
    let { pages, selectedPages, isSendingRequest } = this.props;

    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(page => {
        let isSelected = selectedPages && (selectedPages.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect = !isSendingRequest;

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

  renderBodyModal() {
    let showListPages = this.props.showListPages;
    if (showListPages == true) {
      return this.renderActivePages();
    } else {
      return this.renderCreateNewProject();
    }
  }

  render() {
    return (
      <Modal show={this.props.modalIsShown} onHide={this.closeModal.bind(this)} backdrop='static' keyboard={false} >
        {this.renderBodyModal()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalIsShown: state.project.projectModal.modalIsShown,
    showListPages: state.project.projectModal.showListPages,
    isSendingRequest: state.project.projectModal.isSendingRequest,
    project: state.project.projectModal.project,
    pages: state.project.projectModal.pages,
    selectedPages: state.project.projectModal.selectedPages,
    loadingStatus: state.project.projectModal.loadingStatus
  }
}

export default connect(mapStateToProps)(FmsAddProjectModal);
