import { createActions } from 'redux-actions';

const {
  adminPizzas: {
    items: setPizzasForAdmin,
    fetch: {
      loadPizzas: setFetchPizzasForAdmin,
      deletePizzas: deletePizzasForAdmin,
      changePizzas: changePizzasForAdmin,
      addPizzas: addPizzasForAdmin
    }
  }
} = createActions({
  ADMIN_PIZZAS: {
    ITEMS: null,
    FETCH: {
      LOAD_PIZZAS: null,
      DELETE_PIZZAS: null,
      CHANGE_PIZZAS: null,
      ADD_PIZZAS: null
    }
  }
});

export {
  setPizzasForAdmin,
  setFetchPizzasForAdmin,
  deletePizzasForAdmin,
  changePizzasForAdmin,
  addPizzasForAdmin
};
