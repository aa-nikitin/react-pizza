import { createActions } from 'redux-actions';

const {
  pizzas: { loaded: setLoaded, items: setPizzas, fetch: setFetchPizzas, refresh: setRefresh }
} = createActions({
  PIZZAS: {
    LOADED: null,
    ITEMS: null,
    FETCH: null,
    REFRESH: null
  }
});

export { setLoaded, setPizzas, setFetchPizzas, setRefresh };
