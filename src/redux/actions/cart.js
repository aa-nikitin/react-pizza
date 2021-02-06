import { ADD_PIZZA_CART, CLEAR_CART, REMOVE_CART_ITEM, COUNT_CART_ITEM } from '../constants';

export const addPizzaToCart = (payload) => ({
  type: ADD_PIZZA_CART,
  payload
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const removeCartItem = (payload) => ({
  type: REMOVE_CART_ITEM,
  payload
});

export const countCartItem = (payload) => ({
  type: COUNT_CART_ITEM,
  payload
});
