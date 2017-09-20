const React = require('react');
const {browserHistory} = require('react-router');

const FmsProjectItem = require('FmsProjectItem');
const FmsAddProjectModal = require('FmsAddProjectModal');
const projectApi = require('ProjectApi');

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
        console.log('projects', projects);
        self.setState({projects});
      })
      .catch(err => {
        alert(err.message);
      })
  },
  handleProjectItemClick: function (project) {
    console.log('handleProjectItemClick', project);

    browserHistory.push('/projects/' + project.alias);
  },
  renderPageItems: function () {
    let self = this;
    let projects = this.state.projects;

    if (projects && Array.isArray(projects) && projects.length > 0) {
      return projects.map(project => {
        return (
          <FmsProjectItem key={project.alias} data={project} onItemClick={self.handleProjectItemClick}></FmsProjectItem>
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
            updateProjects={self.updateProjects}></FmsAddProjectModal>
        </div>
      </div>
    );
  }
});

module.exports = FmsProject;
