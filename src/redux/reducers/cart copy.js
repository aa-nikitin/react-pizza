import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { addPizzaToCart, clearCart, removeCartItem, countCartItem } from '../actions';

const getTotalPrice = (arr) => arr.reduce((total, obj) => total + obj.price, 0);

const items = handleActions(
  {
    [addPizzaToCart]: (state, { payload }) =>
      produce(state, (draft) => {
        draft[payload.id] = {
          items: !draft[payload.id] ? [payload] : [...draft[payload.id].items, payload]
        };
        draft[payload.id].totalPrice = getTotalPrice(draft[payload.id].items);
      }),
    [clearCart]: () => {},
    [removeCartItem]: (state, { payload }) => _.omit(state, [payload.id]),
    [countCartItem]: (state, { payload }) =>
      produce(state, (draft) => {
        const dropItems =
          payload.totalCount > 1 ? _.drop(state[payload.id].items) : [...state[payload.id].items];

        const newItems =
          payload.sign === -1
            ? dropItems
            : [...state[payload.id].items, state[payload.id].items[0]];
        draft[payload.id] = { items: newItems, totalPrice: getTotalPrice(newItems) };
      })
  },
  {}
);

const totalPrice = handleActions(
  {
    [addPizzaToCart]: (state, { payload }) => state + payload.price,
    [clearCart]: () => 0,
    [removeCartItem]: (state, { payload }) => state - payload.totalPrice,
    [countCartItem]: (state, { payload }) =>
      payload.totalCount + payload.sign > 0 ? state + payload.price * payload.sign : state
  },
  0
);
const totalCount = handleActions(
  {
    [addPizzaToCart]: (state) => ++state,
    [clearCart]: () => 0,
    [removeCartItem]: (state, { payload }) => state - payload.totalCount,
    [countCartItem]: (state, { payload }) =>
      payload.totalCount + payload.sign > 0 ? state + payload.sign : state
  },
  0
);

export const getCart = ({ cart }) => cart;
export const getCartItems = ({ cart }) => cart.items;
export const getCartHeader = ({ cart: { totalCount, totalPrice } }) => ({
  totalCount,
  totalPrice
});

export default combineReducers({ items, totalPrice, totalCount });
