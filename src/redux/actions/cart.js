// import { ADD_PIZZA_CART, CLEAR_CART, REMOVE_CART_ITEM, COUNT_CART_ITEM } from '../constants';

// export const addPizzaToCart = (payload) => ({
//   type: ADD_PIZZA_CART,
//   payload
// });

// export const clearCart = () => ({
//   type: CLEAR_CART
// });

// export const removeCartItem = (payload) => ({
//   type: REMOVE_CART_ITEM,
//   payload
// });

// export const countCartItem = (payload) => ({
//   type: COUNT_CART_ITEM,
//   payload
// });

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
