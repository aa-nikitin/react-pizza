import { SET_SORT_BY, SET_CATEGORY } from '../constants';
const initialState = { category: null, sortBy: 'popular' };

const filters = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_CATEGORY:
      return { ...state, category: payload };

    default:
      return state;
  }
};

export default filters;
