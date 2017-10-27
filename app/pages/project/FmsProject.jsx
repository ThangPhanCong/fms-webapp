import React from 'react';
import {Link} from 'react-router-dom';
import FmsProjectItem from 'FmsProjectItem';
import FmsAddProjectModal from 'FmsAddProjectModal';
import projectApi from 'ProjectApi';

let FmsProject = React.createClass({
  getInitialState: function () {
    return {
      projects: null
    }
  },
  componentDidMount: function () {
    let self = this;

    this.updateProjects();
  },
  updateProjects: function () {
    let self = this;

    projectApi.getAllProject()
      .then(projects => {
        self.setState({projects});
      })
      .catch(err => {
        alert(err.message);
      })
  },
  handleDeleteProject: function (alias) {
    let self = this;

    projectApi.deleteProject(alias)
      .then(() => {
        self.updateProjects();
      })
      .catch(err => {
        alert(err);
      })
  },
  renderPageItems: function () {
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
  },
  openModal: function () {
    this._child.open();
  },
  render: function() {
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

          <FmsAddProjectModal ref={(child) => {this._child = child;}}
            updateProjects={self.updateProjects} {...self.props}></FmsAddProjectModal>
        </div>
      </div>
    );
  }
});

module.exports = FmsProject;
