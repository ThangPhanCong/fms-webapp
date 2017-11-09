import DashboardApi from '../../api/DashboardApi';
import { setFilteredConversations } from './conversations';
import * as _ from 'lodash';

export const SET_FILTERS = 'SET_FILTERS';
export const SET_TAGS = 'SET_TAGS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

//////////////////////////////////////////////////////////////////////
export const setFilters = (filters) => dispatch => {
  dispatch({ type: SET_FILTERS, filters: filters });
}
export const setTags = (tags) => dispatch => {
  dispatch({ type: SET_TAGS, tags: tags });
}
export const setSearchText = (text) => dispatch => {
  dispatch({ type: SET_SEARCH_TEXT, searchText: text });
}
///////////////////////////////////////////////////////////////////

export const getTagsProject = (alias) => (dispatch, getState) => {
  let filters = getState().dashboard.filters.filters;
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
  dispatch(setFilters(newFilters));
  //this.filterConversations();
}

export const handleTagFilterClick = (_id) => (dispatch, getState) => {
  let newFilters = getState().dashboard.filters.filters;
  newFilters.forEach((filter) => {
    if (filter.isTag && filter.type == _id) {
      filter.isActive = !filter.isActive;
    }
  });
  dispatch(setFilters(_.clone(newFilters)));
  dispatch(filterConversations());
  //dispatch(handleFilter(newFilters));
}

export const handleTypeFilterClick = (position) => (dispatch, getState) => {
  let newFilters = getState().dashboard.filters.filters;
  for (let i = 0; i < newFilters.length; i++) {
    if (newFilters[i].isTag) continue;
    if (i == position) newFilters[i].isActive = !newFilters[i].isActive;
    else {
      if (position == 0) newFilters[i].isActive = false;
      else newFilters[0].isActive = false
      if (position == 2 && i == 3) newFilters[i].isActive = false;
      else if (position == 3 && i == 2) newFilters[i].isActive = false;
    }
  }
  let isShowAll = true;
  newFilters.forEach((filter) => {
    if (filter.isActive == true && !filter.isTag) isShowAll = false;
  });
  if (isShowAll == true) newFilters[0].isActive = true;
  dispatch(handleFilter(newFilters));
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
  let newConversations = filtered.filter((conversation) => {
    let isOK = conversation.tags.filter(convers_tag => {
      let isOK2 = tagFilters.filter(tagFilter => {
        return tagFilter.isActive == true && tagFilter.type == convers_tag._id;
      });
      return isOK2.length != 0;
    });
    return isOK.length != 0;
  });
  if (tagFilters.length == 0) newConversations = filtered;
  dispatch(setFilteredConversations(newConversations));
}