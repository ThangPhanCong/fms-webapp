"use strict";
import React from 'react';
import { Grid, Row, Col, Checkbox, Button, Modal } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {isShowModal, deleteProject} from "../../../actions/setting/setting-general";

class FmsConfirm extends React.Component {
  deleteProject() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(deleteProject(project_alias));
    this.props.history.push("/projects");
  }
  closeModal() {
    const {dispatch} = this.props;
    dispatch(isShowModal());
  }
  renderConfirmModal() {
    return (
      <div className="static-modal body-confirm">
              <Modal.Body>
                Bạn có chắc chắn xóa dự án không?
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Hủy</Button>
                <Button bsStyle="primary" onClick={this.deleteProject.bind(this)}>Xóa</Button>
              </Modal.Footer>

      </div>
    )
  }

  render() {
    return (
      <Modal show={this.props.isShowModal} className="confirm-modal" onHide={this.closeModal.bind(this)} backdrop='static' keyboard={false} >
        {this.renderConfirmModal()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowModal: state.setting.settingGeneral.isShowModal
  }
}

export default withRouter(connect(mapStateToProps)(FmsConfirm));
