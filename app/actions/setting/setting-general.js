import * as store from '../../helpers/storage';
import * as u from 'lodash';
import ProjectApi from '../../api/ProjectApi';
import PagesApi from '../../api/PagesApi';
export const PROJECT_LOADING = 'PROJECT_LOADING';
export const PROJECT_LOADED = 'PROJECT_LOADED';
export const CHANGE_NAME_PROJECT = 'CHANGE_NAME_PROJECT';
export const CHANGE_DESCRIPTON_PROJECT = 'CHANGE_DESCRIPTON_PROJECT';
export const IS_SHOW_CONFIRM_MODAL = 'IS_SHOW_CONFIRM_MODAL';

export const isShowModal = () => dispatch => {
  dispatch({type: IS_SHOW_CONFIRM_MODAL});
}
export const projectLoading = () => dispatch => {
  dispatch({type: PROJECT_LOADING})
}
export const projectLoaded = (project) => dispatch => {
  dispatch({
    type: PROJECT_LOADED,
    project
  })
}

export const changeNameProject = (value) => (dispatch, getState) => {
  let {project} = getState().setting.settingGeneral;
  project.name = value;
  let cloneProject = u.clone(project);
  dispatch({type: CHANGE_NAME_PROJECT, project: cloneProject})
}
export const changeDescriptionProject = (value) => (dispatch, getState) => {
  let {project} = getState().setting.settingGeneral;
  project.description = value;
  let cloneProject = u.clone(project);
  dispatch({type: CHANGE_DESCRIPTON_PROJECT, project: cloneProject})
}
export const getProjectInfo = (project_alias) => dispatch => {
  dispatch(projectLoading());
  ProjectApi.getProject(project_alias)
    .then(data => {
      if (data) {
        dispatch(projectLoaded(data));
      }
    })
}

export const updateProject = (project_alias, project) => dispatch => {
  ProjectApi.updateProject(project_alias, project)
    .then(data => {
      if(data) {
        console.log("data la ", data);
      } else {
        throw new Error("Update Project Fail");
      }
    })
    .catch(err => {
      alert(err.message);
    })
}

export const deleteProject = (project_alias) => dispatch => {
  ProjectApi.deleteProject(project_alias)
    .then(() => {
    })
    .catch(err => {
      alert(err);
    })
}
