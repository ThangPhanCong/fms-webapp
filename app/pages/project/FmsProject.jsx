import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import FmsProjectItem from './FmsProjectItem';
import FmsAddProjectModal from './FmsAddProjectModal';
import { getProjects } from '../../actions/project/project';
import { openModal } from '../../actions/project/projectModal';
import FmsSpin from '../../components/FmsSpin';

class FmsProject extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProjects());
  }

  renderPageItems() {
    let self = this;
    const {projects, dispatch, match, isProjectLoading} = this.props;

    if (projects.length > 0) {
      return projects.map(project => {
        return (
          <Link key={project.alias} to={match.path + '/' + project.alias}>
            <FmsProjectItem data={project}/>
          </Link>
        )
      })
    } else {
      if (isProjectLoading) {
        return <div className="col-md-2"><FmsSpin size={25}></FmsSpin></div>
      } else {
        return <div>Bạn chưa có dự án nào</div>
      }
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
              <button className="btn btn-primary" onClick={this.openModal.bind(this)}>Tạo dự án mới</button>
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

FmsProject.propTypes = {
  isProjectLoading: propTypes.bool.isRequired,
  projects: propTypes.array
}

const mapStateToProps = state => {
  return {
    projects: state.project._project.projects,
    isProjectLoading: state.project._project.isProjectLoading
  }
}

export default connect(mapStateToProps)(FmsProject);
