import * as store from '../../helpers/storage';
import TagApi from '../../api/TagApi';
import ProjectApi from '../../api/ProjectApi';
import PagesApi from '../../api/PagesApi';
import {MAX_TAG_ITEMS, TAG_COLORS} from '../../constants/utils';

export const ADD_TAG = 'ADD_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const CHANGE_VALUE_TAG = 'CHANGE_VALUE_TAG';
export const TAG_LOADED = 'TAG_LOADED';

export const tagLoaded = (tags) => dispatch => {
  dispatch({ type: TAG_LOADED, tags: tags });
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
export const getTags = (project_alias) => dispatch => {
    TagApi.getProjectTags(project_alias)
      .then(tags => {
        if(tags) {
          dispatch(tagLoaded(tags));
        } else {
          throw new Error("Tags not found");
        }
      })
      .catch(err => alert(err.message));
}

export const addNewTag = (project_alias, color, name) => dispatch => {
  TagApi.create(project_alias, name, color)
    .then(newTag => {
      dispatch(addTag(newTag));
    })
    .catch(err => {
      alert(err.message);
    });
}

export const updateTag = (project_alias, tag) => dispatch => {
  TagApi.update(project_alias, tag._id, tag.name, tag.color)
    .then(updatedTag => {
      dispatch(update_tag(updatedTag));
    })
    .catch(err => {
      alert(err.message);
    });
}

export const deleteTag = (project_alias, tag) => dispatch => {
  TagApi.remove(project_alias, tag._id)
    .then(() => {
      dispatch(delete_tag(tag));
    })
    .catch(err => {
      alert(err.message);
    });
}
