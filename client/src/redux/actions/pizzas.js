import { createActions } from 'redux-actions';

const {
  pizzas: {
    loaded: setLoaded,
    items: setPizzas,
    fetch: { load: setFetchPizzas, add: saveFetchPizza, delete: deletePizza },
    refresh: setRefresh
  }
} = createActions({
  PIZZAS: {
    LOADED: null,
    ITEMS: null,
    FETCH: {
      LOAD: null,
      ADD: null,
      DELETE: null
    },
    REFRESH: null
  }
});

export { setLoaded, setPizzas, setRefresh, setFetchPizzas, saveFetchPizza, deletePizza };
