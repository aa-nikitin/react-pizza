import { createActions } from 'redux-actions';
import { fetchPizzas } from '../../api';

const setFetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  fetchPizzas(category, sortBy).then((pizzas) => {
    dispatch(setPizzas(pizzas));
  });
};

const {
  set: { loaded: setLoaded, pizzas: setPizzas }
} = createActions(
  {
    SET: {
      LOADED: null,
      PIZZAS: null
    }
  },
  { namespace: '_' }
);

export { setLoaded, setPizzas, setFetchPizzas };
