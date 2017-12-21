import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {Observable} from 'rxjs/Observable';

import FmsSpin from '../../components/FmsSpin/FmsSpin';
import FmsProjectItem from './FmsProjectItem';
import FmsNewProjectModal from './modals/FmsNewProjectModal';
import FmsAddPagesModal from './modals/FmsAddPagesModal';
import {getProjects, createNewProject} from '../../actions/project/project';
import {getPages} from '../../actions/page';
import projectApi from '../../api/ProjectApi';

let timeout, name, subscription;
let observable = Observable.create(observer => {
  projectApi.verifyName(name)
    .then(() => {
      if (name !== "") observer.complete();
      else observer.error();
    })
    .catch(() => {
      observer.error();
    })
});

class FmsProject extends Component {
  constructor() {
    super();

    this.state = {
      isCreateProjectModalShown: false,
      isNewProjectLoading: false,
      isProjectNameVerified: false,
      isAddPagesModalShown: false,
      projectName: '',
      activePages: []
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getProjects());
  }

  openCreateProjectModal() {
    this.setState({
      isCreateProjectModalShown: true
    })
  }

  onProjectNameChange(_name) {
    name = _name;
    if (!name || name === "") {
      return this.setState({
        isProjectNameVerified: false
      })
    }

    this.setState({
      isNewProjectLoading: true
    });

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (subscription) subscription.unsubscribe();
      subscription = observable.subscribe({
        complete: () => this.setState({isNewProjectLoading: false, isProjectNameVerified: true}),
        error: () => this.setState({
          isNewProjectLoading: false,
          isProjectNameVerified: false
        })
      });
    }, 700);
  }

  onProjectModalClose(projectName) {
    if (!projectName) {
      return this.setState({
        isCreateProjectModalShown: false,
        isProjectNameVerified: false,
        projectName: ''
      })
    }

    this.setState({
      isCreateProjectModalShown: false,
      isProjectNameVerified: false,
      projectName: projectName,

      isAddPagesModalShown: true,
      activePages: []
    });

    this.props.dispatch(getPages());
  }

  onAddPagesModalClose(selectedPages) {
    if (Array.isArray(selectedPages) && selectedPages.length > 0) {
      // create project
      const projectName = this.state.projectName;
      const page_ids = selectedPages.map(page => page.fb_id);

      this.props.dispatch(createNewProject(projectName, page_ids));
    }

    this.setState({
      isAddPagesModalShown: false,
      projectName: '',
      activePages: []
    })
  }

  renderProjects() {
    const {projects, match, isProjectLoading} = this.props;

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
        return <div className="col-sm-1"><FmsSpin size={25}/></div>
      } else {
        return <div>Bạn chưa có dự án nào</div>
      }
    }
  }

  render() {
    const {pages, isPagesLoading} = this.props;
    const {
      isCreateProjectModalShown,
      isNewProjectLoading,
      isProjectNameVerified,
      isAddPagesModalShown,
      projectName
    } = this.state;
    const unActivePages = pages.filter(page => !page.is_active);

    return (
      <div className="page container">
        <div className="project-wrapper">
          <div className="row button-project-wrapper">
            <div className="col-md-2">
              <button
                className="btn btn-primary"
                onClick={this.openCreateProjectModal.bind(this)}
              >Tạo dự án mới
              </button>
            </div>
          </div>
          <div className="row">
            {this.renderProjects()}
          </div>
          <FmsNewProjectModal
            isShown={isCreateProjectModalShown}
            isLoading={isNewProjectLoading}
            isProjectNameVerified={isProjectNameVerified}
            onProjectNameChange={this.onProjectNameChange.bind(this)}
            onClose={this.onProjectModalClose.bind(this)}
          />
          <FmsAddPagesModal
            isShown={isAddPagesModalShown}
            isLoading={isPagesLoading}
            pages={unActivePages}
            projectName={projectName}
            onClose={this.onAddPagesModalClose.bind(this)}
          />

        </div>
      </div>
    );
  }
}

FmsProject.propTypes = {
  isProjectLoading: propTypes.bool.isRequired,
  isPagesLoading: propTypes.bool.isRequired,
  projects: propTypes.array,
  pages: propTypes.array
};

const mapStateToProps = state => {
  return {
    projects: state.project.projects,
    pages: state.page.pages,
    isProjectLoading: state.project.isProjectLoading,
    isPagesLoading: state.page.isPagesLoading
  }
};

export default connect(mapStateToProps)(FmsProject);
