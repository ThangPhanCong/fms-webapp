import projectApi from '../../api/ProjectApi';

export const PROJECTS_LOADIND = 'PROJECTS_LOADIND';
export const PROJECTS_LOADED = 'PROJECTS_LOADED';
export const ADD_NEW_PROJECT = 'ADD_NEW_PROJECT';

export const projectsLoading = () => {
  return {type: PROJECTS_LOADIND};
};
export const projectsLoaded = (projects) => dispatch => {
  dispatch({type: PROJECTS_LOADED, projects: projects});
};

export const getProjects = () => dispatch => {
  dispatch(projectsLoading());

  projectApi.getAllProjects()
    .then(projects => {
      if (!projects) projects = [];
      dispatch(projectsLoaded(projects));
    })
};

export const createNewProject = (projectName, page_ids) => dispatch => {
  projectApi.createNewProject(projectName, page_ids)
    .then(project => {
      dispatch({
        type: ADD_NEW_PROJECT,
        project
      })
    })
    .catch(err => console.log(err));
};
