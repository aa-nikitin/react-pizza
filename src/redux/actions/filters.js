import { createActions } from 'redux-actions';

const {
  set: { sortby: setSortBy, category: setCategory }
} = createActions(
  {
    SET: {
      SORTBY: null,
      CATEGORY: null
    }
  },
  { namespace: '_' }
);

export { setSortBy, setCategory };
