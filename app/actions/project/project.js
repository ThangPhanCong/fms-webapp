import * as store from '../../helpers/storage';
import projectApi from '../../api/ProjectApi';

export const PROJECTS_LOADIND = 'PROJECTS_LOADIND';
export const PROJECTS_LOADED = 'PROJECTS_LOADED';
export const ADD_NEW_PROJECT = 'ADD_NEW_PROJECT';

export const projectsLoading = () => {
  return { type: PROJECTS_LOADIND };
}
export const projectsLoaded = (projects) => dispatch => {
  dispatch({ type: PROJECTS_LOADED, projects: projects });
}

export const getProjects = () => dispatch => {
  let access_token = store.get('access_token');
  dispatch(projectsLoading());

  projectApi.getAllProjects()
    .then(projects => {
      if (!projects) projects = [];
      dispatch(projectsLoaded(projects));
    })
}

export const deleteProject = (alias) => dispatch => {
  projectApi.deleteProject(alias)
    .then(() => {
      return projectApi.getAllProjects();
    })
    .then(projects => {
      dispatch(projectsLoaded(projects));
    })
    .catch(err => {
      alert(err);
    })
}

export const createNewProject = (projectName, page_ids) => dispatch => {
  projectApi.createNewProject(projectName, page_ids)
    .then(project => {
      dispatch({
        type: ADD_NEW_PROJECT,
        project
      })
    })
    .catch(err => console.log(err));
}
