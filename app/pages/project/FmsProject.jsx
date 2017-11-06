import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FmsProjectItem from './FmsProjectItem';
import FmsAddProjectModal from './FmsAddProjectModal';
import { getProjects } from '../../actions/project/project';
import { openModal } from '../../actions/project/projectModal';

class FmsProject extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProjects());
  }

  renderPageItems() {
    let self = this;
    let { projects, dispatch } = this.props;

    if (projects.length > 0) {
      return projects.map(project => {
        return (
          <Link key={project.alias} to={self.props.match.path + '/' + project.alias}>
            <FmsProjectItem data={project} />
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
    let { dispatch } = this.props;
    dispatch(openModal());
  }

  render() {
    return (
      <div className="page container">
        <div className="project-wrapper">
          <div className="row button-project-wrapper">
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={this.openModal.bind(this)}>Add new project</button>
            </div>
          </div>
          <div className="row">
            {this.renderPageItems()}
          </div>
          <FmsAddProjectModal />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project._project.projects
  }
}

export default connect(mapStateToProps)(FmsProject);
