import { createActions } from 'redux-actions';

const {
  adminPizzas: { items: setPizzasForAdmin, fetchPizzas: setFetchPizzasForAdmin }
} = createActions({
  ADMIN_PIZZAS: {
    ITEMS: null,
    FETCH_PIZZAS: null
  }
});

export { setPizzasForAdmin, setFetchPizzasForAdmin };
