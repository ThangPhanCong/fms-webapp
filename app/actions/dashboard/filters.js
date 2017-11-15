import DashboardApi from '../../api/DashboardApi';
import * as u from 'lodash';
import { getConversations } from './conversations';

export const setFilters = (filters) => dispatch => {
  dispatch({ type: 'SET_FILTERS', filters: filters });
}
export const setTags = (tags) => dispatch => {
  dispatch({ type: 'SET_TAGS', tags: tags });
}
export const setSearchText = (text) => dispatch => {
  dispatch({ type: 'SET_SEARCH_TEXT', searchText: text });
}

export const getTagsProject = (alias) => (dispatch, getState) => {
  let { filters } = getState().dashboard.filters;
  DashboardApi.getProjectTags(alias).then((res) => {
    res.forEach((tag) => {
      filters.push({
        isTag: true,
        type: tag._id,
        isActive: false
      });
    });
    dispatch(setTags(res));
    dispatch(setFilters(filters))
  }, (err) => {
    throw new Error(err);
  });
}

export const handleFilter = (newFilters) => (dispatch, getState) => {
  let alias = getState().dashboard.conversations.alias;
  dispatch(setFilters(u.clone(newFilters)));
  dispatch(getConversations(alias));
}

export const handleTagFilterClick = (_id) => (dispatch, getState) => {
  let { filters } = getState().dashboard.filters;
  filters.forEach((filter) => {
    if (filter.isTag && filter.type == _id) {
      filter.isActive = !filter.isActive;
    }
  });
  dispatch(handleFilter(filters));
}

export const handleTypeFilterClick = (position) => (dispatch, getState) => {
  let { filters } = getState().dashboard.filters;
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].isTag) continue;
    if (i == position) filters[i].isActive = !filters[i].isActive;
    else {
      if (position == 0) filters[i].isActive = false;
      else filters[0].isActive = false
      if (position == 2 && i == 3) filters[i].isActive = false;
      else if (position == 3 && i == 2) filters[i].isActive = false;
    }
  }
  let isShowAll = true;
  filters.forEach((filter) => {
    if (filter.isActive == true && !filter.isTag) isShowAll = false;
  });
  if (isShowAll == true) filters[0].isActive = true;
  dispatch(handleFilter(filters));
}