import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import FmsProjectItem from './FmsProjectItem';
import FmsAddProjectModal from './FmsAddProjectModal';
import {getProjects} from '../../actions/project';

class FmsProject extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getProjects());
  }

  renderPageItems() {
    let self = this;
    let {projects} = this.props;

    if (projects.length > 0) {
      return projects.map(project => {
        return (
          <Link key={project.alias} to={self.props.match.path + '/' + project.alias}>
            <FmsProjectItem data={project}
              handleDeleteProject={self.handleDeleteProject}></FmsProjectItem>
          </Link>
        )
      })
    } else {
      return (
        <div>Bạn chưa có project nào</div>
      )
    }
  }

  openModal() {
    this._child.open();
  }

  render() {
    let self = this;

    return (
      <div className="page container">
        <div className="project-wrapper">
          <div className="row button-project-wrapper">
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={self.openModal}>Add new project</button>
            </div>
          </div>

          <div className="row">
            {
              self.renderPageItems()
            }
          </div>

          <FmsAddProjectModal ref={(child) => { this._child = child; }}
            updateProjects={self.updateProjects} {...self.props}></FmsAddProjectModal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.projects
  }
}

export default connect(mapStateToProps)(FmsProject);
