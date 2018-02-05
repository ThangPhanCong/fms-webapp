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

const isShowAll = (filters) => {
    let isShowAll = true;
    filters.forEach((filter) => {
        if (filter.isActive === true && filter.type !== 'all') isShowAll = false;
    });
    return isShowAll;
};

export const handleTagFilterClick = (alias, _id) => (dispatch, getState) => {
    let {filters} = getState().dashboard.filters;
    filters.forEach((filter) => {
        if (filter.isTag && filter.type === _id) {
            filter.isActive = !filter.isActive;
        }
    });
    filters[0].isActive = isShowAll(filters);
    dispatch(handleFilter(alias, filters));
};

export const handleTypeFilterClick = (alias, position) => (dispatch, getState) => {
    let {filters} = getState().dashboard.filters;
    if (position === 0) {
        filters.forEach(f => {
            f.isActive = f.type === 'all';
        });
    } else {
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].isTag) continue;
            if (i === position) filters[i].isActive = !filters[i].isActive;
            else {
                if (position === 2 && i === 3) filters[i].isActive = false;
                else if (position === 3 && i === 2) filters[i].isActive = false;
            }
        }
        filters[0].isActive = isShowAll(filters);
    }
    dispatch(handleFilter(alias, filters));
};