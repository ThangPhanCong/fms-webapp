

import React from 'react';
import { Link } from 'react-router-dom';
import FmsProjectItem from 'FmsProjectItem';
import FmsAddProjectModal from 'FmsAddProjectModal';
import projectApi from 'ProjectApi';

class FmsProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    }
    this.updateProjects = this.updateProjects.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    let self = this;
    this.updateProjects();
  }
  updateProjects() {
    let self = this;

    projectApi.getAllProject()
      .then(projects => {
        self.setState({ projects });
      })
      .catch(err => {
        alert(err.message);
      })
  }
  handleDeleteProject(alias) {
    let self = this;

    projectApi.deleteProject(alias)
      .then(() => {
        self.updateProjects();
      })
      .catch(err => {
        alert(err);
      })
  }
  renderPageItems() {
    let self = this;
    let projects = this.state.projects;

    if (projects && Array.isArray(projects) && projects.length > 0) {
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
            {self.renderPageItems()}
          </div>

          <FmsAddProjectModal ref={(child) => { this._child = child; }}
            updateProjects={self.updateProjects} {...self.props}></FmsAddProjectModal>
        </div>
      </div>
    );
  }
}

module.exports = FmsProject;
