import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

import FmsPageItem from './FmsPageItem';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import projectApi from '../../../api/ProjectApi';
import pagesApi from '../../../api/PagesApi';
import ic_verify from '../../../images/ic_verify.png';
import ic_cancel from '../../../images/ic_cancel.png';

class FmsCreateNewProjectModal extends Component {

  onCloseButtonClick() {
    const projectName = this.refs.projectName.value;
    this.props.onClose(projectName);
  }

  onInputChange() {
    const projectName = this.refs.projectName.value;
    this.props.onProjectNameChange(projectName);
  }

  render() {
    const {
      isShown,
      isLoading,
      isProjectNameVerified
    } = this.props;

    const projectName = this.refs.projectName ?
      this.refs.projectName.value : '';

    return (
      <Modal show={isShown} backdrop='static' keyboard={false}>
        <div className="add-project-modal">
          <Modal.Header
            closeButton={true}
            onHide={() => {
              this.props.onClose();
            }}
          >
            <Modal.Title>Tạo dự án mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="project-name">Tên dự án</label>
              <div className="loading-name">
                {
                  isLoading ?
                    <FmsSpin size={16}/> :
                    (isProjectNameVerified ?
                        <img width={16} src={ic_verify}/> :
                        (projectName !== '' ?
                            <img width={16} src={ic_cancel}/> : null
                        )
                    )
                }
              </div>
              <input
                type="project-name"
                className="form-control"
                ref="projectName"
                id="project-name"
                onChange={this.onInputChange.bind(this)}>

              </input>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className={"btn btn-primary active-btn"}
              onClick={this.onCloseButtonClick.bind(this)}
              disabled={!isProjectNameVerified || isLoading}
            >Tiếp tục
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

FmsCreateNewProjectModal.propTypes = {
  isShown: propTypes.bool.isRequired,
  onProjectNameChange: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  isProjectNameVerified: propTypes.bool.isRequired
};

export default FmsCreateNewProjectModal;
