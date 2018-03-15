import TagApi from '../../api/TagApi';
import {getConversations, setConversations} from './conversations';

export const setFilters = (filters) => dispatch => {
    dispatch({type: 'SET_FILTERS', filters: filters});
};
export const setTags = (tags) => dispatch => {
    dispatch({type: 'SET_TAGS', tags: tags});
};
export const setSearchText = (text) => dispatch => {
    dispatch({type: 'SET_SEARCH_TEXT', searchText: text});
};
export const resetFilters = () => dispatch => {
    dispatch({type: 'RESET_INIT_STATE_FILTERS'});
};

export const getTagsProject = (alias) => (dispatch, getState) => {
    let {filters} = getState().dashboard.filters;
    TagApi.getProjectTags(alias).then((res) => {
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
};

export const handleFilter = (alias, newFilters) => (dispatch) => {
    dispatch(setConversations([]));
    if (Array.isArray(newFilters)) dispatch(setFilters([...newFilters]));
    dispatch(getConversations(alias));
};

export const handleTagFilterClick = (alias, _id) => (dispatch, getState) => {
    let {filters} = getState().dashboard.filters;
    filters.forEach((filter) => {
        if (filter.isTag && filter.type === _id) {
            filter.isActive = !filter.isActive;
        }
    });
    dispatch(handleFilter(alias, filters));
};

export const handleTypeFilterClick = (alias, type) => (dispatch, getState) => {
    let {filters} = getState().dashboard.filters;
    filters.forEach(filter => {
        if (!filter.isTag) {
            filter.isActive = filter.type === type;
        }
    });
    dispatch(handleFilter(alias, filters));
};