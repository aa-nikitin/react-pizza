import { createActions } from 'redux-actions';

const {
  cartPizza: { add: addPizzaToCart, clear: clearCart, remove: removeCartItem, count: countCartItem }
} = createActions({
  CART_PIZZA: {
    ADD: null,
    CLEAR: null,
    REMOVE: null,
    COUNT: null
  }
});

export { addPizzaToCart, clearCart, removeCartItem, countCartItem };
