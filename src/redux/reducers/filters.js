import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setSortBy, setCategory } from '../actions';

const sortBy = handleActions(
  {
    [setSortBy]: (_state, { payload }) => payload
  },
  'popular'
);

const category = handleActions(
  {
    [setCategory]: (_state, { payload }) => payload
  },
  null
);

export const getFilters = ({ filters }) => filters;

export default combineReducers({ sortBy, category });
