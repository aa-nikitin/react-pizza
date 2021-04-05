import { createActions } from 'redux-actions';

const {
  filters: { sortBy: setSortBy, sortOrder: setSortOrder, category: setCategory }
} = createActions({
  FILTERS: {
    SORT_BY: null,
    SORT_ORDER: null,
    CATEGORY: null
  }
});

export { setSortBy, setCategory, setSortOrder };
