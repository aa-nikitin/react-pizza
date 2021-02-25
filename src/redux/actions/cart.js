import { createActions } from 'redux-actions';

const {
  cartpizza: { add: addPizzaToCart, clear: clearCart, remove: removeCartItem, count: countCartItem }
} = createActions(
  {
    CARTPIZZA: {
      ADD: null,
      CLEAR: null,
      REMOVE: null,
      COUNT: null
    }
  },
  { namespace: '_' }
);

export { addPizzaToCart, clearCart, removeCartItem, countCartItem };
