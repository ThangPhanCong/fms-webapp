import * as store from '../../helpers/storage';
import projectApi from '../../api/ProjectApi';


export const projectsLoading = () => dispatch => {
  dispatch({ type: 'PROJECTS_LOADIND' });
}
export const projectsLoaded = (projects) => dispatch => {
  dispatch({ type: 'PROJECTS_LOADED', projects: projects });
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