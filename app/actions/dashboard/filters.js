import DashboardApi from '../../api/DashboardApi';
import { setFilteredConversations } from './conversations';
import * as u from 'lodash';

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
        isActive: false,
        filterFunc: (item) => {
          let isOK = item.tags.filter((_tag) => { return _tag._id == tag._id });
          return isOK.length != 0;
        }
      });
    });
    dispatch(setTags(res));
    dispatch(setFilters(filters))
  }, (err) => {
    throw new Error(err);
  });
}

export const handleFilter = (newFilters) => dispatch => {
  dispatch(setFilters(u.clone(newFilters)));
  dispatch(filterConversations());
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

export const filterConversations = () => (dispatch, getState) => {
  let filtered = getState().dashboard.conversations.conversations;
  let tagFilters = [];
  getState().dashboard.filters.filters.map((filter) => {
    if (filter.isActive == true) {
      if (!filter.isTag) filtered = filtered.filter(filter.filterFunc);
      else tagFilters.push(filter);
    }
  });
  let newConversations = [];
  if (tagFilters.length == 0) newConversations = filtered;
  else {
    newConversations = filtered.filter((conversation) => {
      return conversation.tags.filter(convers_tag => {
        return tagFilters.filter(tagFilter => {
          return tagFilter.isActive == true && tagFilter.type == convers_tag._id;
        }).length != 0;
      }).length != 0;
    });
  }
  dispatch(setFilteredConversations(newConversations));
}