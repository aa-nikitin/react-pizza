import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setSortBy, setCategory, setFetchPizzas } from '../actions';

const sortBy = handleActions(
  {
    [setSortBy]: (_state, { payload }) => payload,
    [setFetchPizzas]: (state, { payload }) => (payload ? 'popular' : state)
  },
  'popular'
);

const category = handleActions(
  {
    [setCategory]: (_state, { payload }) => payload,
    [setFetchPizzas]: (state, { payload }) => (payload ? null : state)
  },
  null
);

export const getFilters = ({ filters }) => filters;

export default combineReducers({ sortBy, category });
