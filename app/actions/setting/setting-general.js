import * as store from '../../helpers/storage';
import ProjectApi from '../../api/ProjectApi';
import PagesApi from '../../api/PagesApi';

export const PROJECT_LOADED = 'PROJECT_LOADED';


export const projectLoaded = (project) => dispatch => {
  dispatch({
    type: PROJECT_LOADED,
    project
  })
}

export const getProjectInfo = (project_alias) => dispatch => {
  ProjectApi.getProject(project_alias)
    .then(data => {
      if (data) {
        dispatch(projectLoaded(data));
      }
    })
}

export const updateProject = (project_alias, project) => dispatch => {
}

export const deleteProject = (project_alias) => dispatch => {
  ProjectApi.deleteProject(project_alias)
    .then(() => {})
    .catch(err => {
      alert(err);
    })
}
