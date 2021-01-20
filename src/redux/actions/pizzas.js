import { SET_LOADED, SET_PIZZAS } from '../constants';
import { fetchPizzas } from '../../api';

export const setFetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  fetchPizzas(category, sortBy).then((pizzas) => {
    dispatch(setPizzas(pizzas));
  });
};

export const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload
});
export const setPizzas = (items) => ({
  type: SET_PIZZAS,
  payload: items
});
