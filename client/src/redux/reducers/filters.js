import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setSortBy, setSortOrder, setCategory } from '../actions';

const sortBy = handleActions(
  {
    [setSortBy]: (_state, { payload }) => payload
  },
  'rating'
);
const sortOrder = handleActions(
  {
    [setSortOrder]: (_state, { payload }) => payload
  },
  'desc'
);

const category = handleActions(
  {
    [setCategory]: (_state, { payload }) => payload
  },
  null
);

export const getFilters = ({ filters }) => filters;

export default combineReducers({ sortBy, sortOrder, category });
