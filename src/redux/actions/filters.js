import { createActions } from 'redux-actions';

const {
  filters: { sortby: setSortBy, category: setCategory }
} = createActions({
  FILTERS: {
    SORTBY: null,
    CATEGORY: null
  }
});

export { setSortBy, setCategory };
