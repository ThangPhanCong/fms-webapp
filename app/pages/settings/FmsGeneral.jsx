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
import {getProjectInfo, deleteProject} from "../../actions/setting/setting-general";
import {settingLoading, settingLoaded} from "../../actions/setting/setting";

class FmsGeneral extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(settingLoading());
    dispatch(getProjectInfo(project_alias));
    dispatch(settingLoaded());
  }
  changeName(e) {
    console.log("e.targe.value", e.target.value);
  }
  deleteProject() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(deleteProject(project_alias));
    this.props.history.push("/projects");
  }

  render() {
    const {project} = this.props;
    return (<div className="fms-block">
      <Row className="setting-header">
        <Col>
          Thông tin chung
        </Col>
      </Row>
      <FormGroup>
        <ControlLabel>Tên</ControlLabel>
        <FormControl type="text" id="formControlsText" value={project.name} onChange={this.changeName.bind(this)}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Mô tả</ControlLabel>
        <FormControl componentClass="textarea"/>
      </FormGroup>
      <FormGroup>
        <Button>Cập nhật</Button>
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
              <Button bsStyle="danger" onClick={this.deleteProject.bind(this)}>Xóa</Button>
              </li>
          </ul>

        </div>
      </FormGroup>
    </div>);
  }
}

const mapStateToProps = state => {
  return {isSettingLoading: state.setting.isSettingLoading, project: state.setting.settingGeneral.project}
}

export default withRouter(connect(mapStateToProps)(FmsGeneral));
