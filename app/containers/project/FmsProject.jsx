import React, {Component} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Observable} from 'rxjs/Observable';

import FmsSpin from '../../commons/FmsSpin/FmsSpin';
import FmsProjectItem from './FmsProjectItem';
import FmsNewProjectModal from './modals/FmsNewProjectModal';
import FmsAddPagesModal from './modals/FmsAddPagesModal';
import {getProjects, createNewProject} from '../../actions/project/project';
import projectApi from '../../api/ProjectApi';
import FmsNavigation from "../../commons/FmsNavigation/FmsNavigation";
import {Redirect} from 'react-router-dom';
import * as storage from "../../helpers/storage";

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
            activePages: [],
            projects: [],
            isProjectLoading: true
        }
    }

    componentDidMount() {
        const {dispatch, user, projects} = this.props;
        if (user && user.role === 'SHOP_OWNER') {
            // dispatch(getProjects());
            this.loadProjects();
        } else {
            this.loadStoreProjects();
        }
    }

    loadProjects() {
        projectApi.getAllProjects()
            .then(projects => {
                storage.set('projects', projects);

                this.setState({projects, isProjectLoading: false});
            })
    }

    loadStoreProjects() {
        const projects = storage.get('projects');
        this.setState({projects, isProjectLoading: false});
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
            projectName: '',

            // isAddPagesModalShown: true,
            // activePages: []
        });

        this.props.dispatch(createNewProject(projectName));

        // this.props.dispatch(getPages());
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

    navigateToProject(projectAlias) {
        const {history} = this.props;
        history.push(`/shops/${projectAlias}`);
    }

    renderProjects() {
        const {projects, isProjectLoading} = this.state;

        if (projects.length > 0) {
            return projects.map((project, i) => (
                <FmsProjectItem
                    key={project.data._id}
                    data={project.data}
                    onClick={() => this.navigateToProject(project.data.alias)}
                />
            ))
        } else {
            if (isProjectLoading) {
                return <div className="col-sm-1"><FmsSpin size={25}/></div>
            } else {
                return <div className="no-project">Bạn chưa có cửa hàng nào</div>
            }
        }
    }

    render() {
        const {pages, user} = this.props;
        const {
            isCreateProjectModalShown,
            isNewProjectLoading,
            isProjectNameVerified,
            isAddPagesModalShown,
            projectName
        } = this.state;
        const role = this.props.user.role;
        const unActivePages = pages.filter(page => !page.is_active);

        return (
            <div style={{backgroundColor: '#f3f2f2', minHeight: '100vh'}}>
                <FmsNavigation/>

                <div className="container project-wrapper">

                    {
                        user && user.role === 'SHOP_OWNER'
                            ? (
                                <div className="row button-project-wrapper">
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary btn-open-project-modal"
                                            onClick={this.openCreateProjectModal.bind(this)}
                                        >
                                            <i className='fa fa-plus'/>&nbsp; Tạo cửa hàng mới
                                        </button>
                                    </div>
                                </div>
                            )
                            : null
                    }

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

                    {/*<FmsAddPagesModal*/}
                    {/*isShown={isAddPagesModalShown}*/}
                    {/*isLoading={isPagesLoading}*/}
                    {/*pages={unActivePages}*/}
                    {/*projectName={projectName}*/}
                    {/*onClose={this.onAddPagesModalClose.bind(this)}*/}
                    {/*/>*/}

                </div>
            </div>
        );

    }
}

FmsProject.propTypes = {
    isProjectLoading: propTypes.bool.isRequired,
    isPagesLoading: propTypes.bool.isRequired,
    projects: propTypes.array,
    pages: propTypes.array,
    user: propTypes.object
};

const mapStateToProps = state => {
    return {
        projects: state.project.projects,
        pages: state.page.pages,
        user: state.auth.user,
        isProjectLoading: state.project.isProjectLoading,
        isPagesLoading: state.page.isPagesLoading
    }
};

export default connect(mapStateToProps)(FmsProject);
