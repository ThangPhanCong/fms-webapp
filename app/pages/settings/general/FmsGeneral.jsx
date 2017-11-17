import React from 'react';
import {
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';

import {
  getProjectInfo,
  isShowModal,
  changeNameProject,
  updateProject,
  changeDescriptionProject
} from "../../../actions/setting/setting-general";
import projectApi from '../../../api/ProjectApi';
import FmsSpin from '../../../components/FmsSpin';
import FmsConfirm from "./FmsConfirm";

class FmsGeneral extends React.Component {
  constructor () {
    super();

    this.state = {
      isConfirmModalShown: false
    }
  }

  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getProjectInfo(project_alias));
  }

  changeName(e) {
    const {dispatch} = this.props;
    let value = e.target.value;
    dispatch(changeNameProject(value))
  }

  changeDescription(e) {
    const {dispatch} = this.props;
    let description = e.target.value;
    dispatch(changeDescriptionProject(description));
  }

  isShowModal() {
    this.setState({
      isConfirmModalShown: true
    })
  }

  onConfirmModalClose (deleteProject) {
    if (deleteProject) {
      let alias = this.props.match.params.project_alias;
      projectApi.deleteProject(alias)
        .then(() => {
          this.props.history.push("/projects");
        })
    }

    this.setState({
      isConfirmModalShown: false
    })
  }

  updateProject() {
    const {project_alias} = this.props.match.params;
    const {project, dispatch, isProjectLoading} = this.props;
    dispatch(updateProject(project_alias, project));
  }

  renderProject() {
    const {isProjectLoading, project} = this.props;
    if (isProjectLoading) {
      return <FmsSpin size={25}></FmsSpin>;
    } else {
      return (
        <div>
          <FormGroup>
            <ControlLabel>Tên</ControlLabel>
            <FormControl type="text" id="formControlsText" value={project.name} onChange={this.changeName.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mô tả</ControlLabel>
            <FormControl componentClass="textarea" value={project.description} onChange={this.changeDescription.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.updateProject.bind(this)}>Cập nhật</Button>
          </FormGroup>
          <FormGroup>
            <Row className="setting-header">
              <Col>
                Khu vực nguy hiểm
              </Col>
            </Row>
            <div className="danger-zone">
              <ul>
                <li>
                  <p>Xóa dự án</p>
                  <Button onClick={this.isShowModal.bind(this)}>Xóa</Button>
                </li>
              </ul>

            </div>
          </FormGroup>
          <FmsConfirm isShown={this.state.isConfirmModalShown} onClose={this.onConfirmModalClose.bind(this)}></FmsConfirm>
        </div>
      )
    }
  }

  render() {
    return (<div className="fms-block">
      <Row className="setting-header">
        <Col>
          Thông tin chung
        </Col>
      </Row>
      {this.renderProject()}
    </div>);
  }
}

const mapStateToProps = state => {
  return {isProjectLoading: state.setting.settingGeneral.isProjectLoading, project: state.setting.settingGeneral.project}
}

export default withRouter(connect(mapStateToProps)(FmsGeneral));
