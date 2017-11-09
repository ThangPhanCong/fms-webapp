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
import {getProjectInfo, deleteProject} from "../../actions/setting";

class FmsGeneral extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getProjectInfo(project_alias));
  }
  changeName(e) {
    console.log("e.targe.value", e.target.value);
  }
  deleteProject() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(deleteProject(project_alias));
    console.log("delte project");
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
        <FormControl value={project.name} onChange={this.changeName}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Mô tả</ControlLabel>
        <FormControl componentClass="textarea"/>
      </FormGroup>
      <FormGroup>
      <Button bsStyle="warning">Cập nhật</Button>
      </FormGroup>
      <FormGroup>
      <Button bsStyle="danger" onClick={this.deleteProject.bind(this)}>Xóa</Button>
      </FormGroup>
    </div>);
  }
}

const mapStateToProps = state => {
  return {isSettingLoading: state.setting.isSettingLoading, project: state.setting.project}
}

export default connect(mapStateToProps)(FmsGeneral);
