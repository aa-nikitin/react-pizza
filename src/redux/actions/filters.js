import { SET_SORT_BY, SET_CATEGORY } from '../constants';

export const setSortBy = name => ({
    type: SET_SORT_BY,
    payload: name,
});
export const setCategory = catIndex => ({
    type: SET_CATEGORY,
    payload: catIndex,
});
