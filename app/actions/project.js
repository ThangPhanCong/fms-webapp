import * as store from '../helpers/storage';
import projectApi from '../api/ProjectApi';

export const PROJECTS_LOADIND = 'PROJECTS_LOADIND';
export const PROJECTS_LOADED = 'PROJECTS_LOADED';

export const getProjects = () => dispatch => {
  let access_token = store.get('access_token');
  dispatch({type: PROJECTS_LOADIND});

  projectApi.getAllProjects()
    .then(projects => {
      dispatch({type: PROJECTS_LOADED, projects});
    })
}
