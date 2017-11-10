import * as store from '../helpers/storage';
import TagApi from '../api/TagApi';
import ProjectApi from '../api/ProjectApi';
import PagesApi from '../api/PagesApi';
import {MAX_TAG_ITEMS, TAG_COLORS} from '../constants/utils';
export const SETTING_LOADING = 'SETTING_LOADING';
export const SETTING_LOADED = 'SETTING_LOADED';
export const ADD_TAG = 'ADD_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const CHANGE_VALUE_TAG = 'CHANGE_VALUE_TAG';
export const IS_EDITTING = 'IS_EDITTING';
export const PROJECT_LOADED = 'PROJECT_LOADED';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const PAGES_LOADED = 'PAGES_LOADED';
export const SET_SELECTED_PAGES = 'SET_SELECTED_PAGES';
export const IS_SHOW_MODAL = 'IS_SHOW_MODAL';
export const ALL_PAGES_LOADED = 'ALL_PAGES_LOADED';

export const settingLoading = () => dispatch => {
  dispatch({ type: SETTING_LOADING});
}
export const settingLoaded = (tags) => dispatch => {
  dispatch({ type: SETTING_LOADED, tags: tags });
}
export const addTag = (newTag) => dispatch => {
  dispatch({type: ADD_TAG, newTag});
}
export const update_tag = (updatedTag) => dispatch => {
  dispatch({type: UPDATE_TAG, updatedTag});
}
export const delete_tag = (tag) => dispatch => {
  dispatch({type: DELETE_TAG, tag});
}
export const changeValueTag = (value) => dispatch => {
  dispatch({type: CHANGE_VALUE_TAG, value})
}
export const isEditting = () => dispatch => {
  dispatch({type: IS_EDITTING})
}
export const projectLoaded = (project) => dispatch => {
  dispatch({type: PROJECT_LOADED, project})
}
export const pagesLoaded = (pages) => dispatch => {
  dispatch({type: PAGES_LOADED, pages})
}
export const setSelectedPages = (selectedPages) => dispatch => {
  dispatch({type: SET_SELECTED_PAGES, selectedPages})
}
export const isShowModal = () => dispatch => {
  dispatch({type: IS_SHOW_MODAL})
}
export const allPagesLoaded = (allPages) => dispatch => {
  dispatch({type: ALL_PAGES_LOADED, allPages})
}
export const getTags = (project_alias) => dispatch => {
    dispatch(settingLoading());
    TagApi.getProjectTags(project_alias)
      .then(tags => {
        if(tags) {
          dispatch(settingLoaded(tags));
        } else {
          throw new Error("Tags not found");
        }
      })
      .catch(err => alert(err.message));
}

export const addNewTag = (project_alias, color, name) => dispatch => {
  dispatch(settingLoading());
  TagApi.create(project_alias, name, color)
    .then(newTag => {
      dispatch(addTag(newTag));
    })
    .catch(err => {
      alert(err.message);
    });
}

export const updateTag = (project_alias, tag) => dispatch => {
  dispatch(settingLoading());
  TagApi.update(project_alias, tag._id, tag.name, tag.color)
    .then(updatedTag => {
      dispatch(update_tag(updatedTag));
    })
    .catch(err => {
      alert(err.message);
    });
}

export const deleteTag = (project_alias, tag) => dispatch => {
  dispatch(settingLoading());
  TagApi.remove(project_alias, tag._id)
    .then(() => {
      dispatch(delete_tag(tag));
    })
    .catch(err => {
      alert(err.message);
    });
}

export const getProjectInfo = (project_alias) => dispatch => {
  dispatch(settingLoading());
  ProjectApi.getProject(project_alias)
    .then(data => {
      if(data) {
        dispatch(projectLoaded(data));
      }
    })
}

export const updateProject = (project_alias, project) => dispatch => {
  dispatch(settingLoading());
}

export const deleteProject = (project_alias) => dispatch => {
  dispatch(settingLoading());
  ProjectApi.deleteProject(project_alias)
    .then(() => {
    })
    .catch(err => {
      alert(err);
    })
}

export const getPagesProject = (project_alias) => dispatch => {
  dispatch(settingLoading());
  ProjectApi.getProject(project_alias)
  .then(data => {
    if(data) {
      dispatch(pagesLoaded(data.pages));
    }
  })
}

export const selectPage = (is_selected, page_fb_id) => (dispatch, getState) => {
  dispatch(settingLoading());
  let {selectedPages, pages} = getState().setting;
  if (is_selected) {
    let selectedPage = pages.filter((page) => {
      return page.fb_id == page_fb_id;
    }).pop();

    if (!selectedPages) selectedPages = [];
    selectedPages.push(selectedPage);
  } else {
    selectedPages = selectedPages.filter(page => {
      return page.fb_id != page_fb_id;
    })
  }
  dispatch(setSelectedPages(_.clone(selectedPages)));
}

export const getPages = () => dispatch => {
  dispatch(settingLoading());
  PagesApi.getPages()
    .then(pages => {
      if(pages) {
        dispatch(allPagesLoaded(pages))
      }
    })
}
