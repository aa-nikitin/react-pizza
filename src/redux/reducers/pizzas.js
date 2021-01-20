import { SET_LOADED, SET_PIZZAS } from '../constants';
const initialState = { items: [], isLoaded: false };

const pizzas = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADED:
      return { ...state, isLoaded: payload };

    case SET_PIZZAS:
      return { ...state, items: payload, isLoaded: true };
    default:
      return state;
  }
};

export default pizzas;
