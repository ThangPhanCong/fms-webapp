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
import {withRouter} from 'react-router-dom';

import {
  getProjectInfo,
  changeNameProject,
  updateProject,
  changeDescriptionProject
} from "../../../actions/setting/setting-general";
import projectApi from '../../../api/ProjectApi';
import FmsSpin from '../../../components/FmsSpin';
import FmsConfirm from "../../../components/confirm-modal/FmsConfirm";

class FmsGeneral extends React.Component {
  constructor() {
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

  onConfirmModalClose(deleteProject) {
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
    const {project, dispatch} = this.props;
    dispatch(updateProject(project_alias, project));
  }

  renderProject() {
    const {isProjectLoading, project} = this.props;
    const content = "Bạn có chắc chắn xóa dự án không?";
    if (isProjectLoading) {
      return <FmsSpin size={25}/>;
    } else {
      return (
        <div>
          <FormGroup>
            <ControlLabel>Tên</ControlLabel>
            <FormControl type="text" id="formControlsText" value={project.name} onChange={this.changeName.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mô tả</ControlLabel>
            <FormControl componentClass="textarea" value={project.description}
                         onChange={this.changeDescription.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <Button className="button-common update-project" onClick={this.updateProject.bind(this)}>Cập nhật</Button>
          </FormGroup>
          <FormGroup className="danger-zone">
            <Row className="setting-header delete-project">
              <Col>
                Khu vực nguy hiểm
              </Col>
            </Row>
            <div className="danger-zone-body">
              <p>Khi bạn xóa dự án, toàn bộ dữ liệu khách hàng sẽ bị xóa. Hãy chắc chắn với hành động này!</p>
              <Button onClick={this.isShowModal.bind(this)}>Xóa</Button>
            </div>
          </FormGroup>
          <FmsConfirm content={content} isShown={this.state.isConfirmModalShown}
                      onClose={this.onConfirmModalClose.bind(this)}/>
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
  return {
    isProjectLoading: state.setting.settingGeneral.isProjectLoading,
    project: state.setting.settingGeneral.project
  }
};

export default withRouter(connect(mapStateToProps)(FmsGeneral));
