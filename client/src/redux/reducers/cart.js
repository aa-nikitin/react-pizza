import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { addPizzaToCart, clearCart, removeCartItem, countCartItem } from '../actions';

const items = handleActions(
  {
    [addPizzaToCart]: (state, { payload }) =>
      produce(state, (draft) => {
        const idPizzaCart = `${payload.type.id}-${payload.size.id}`;
        draft[payload._id] = !draft[payload._id]
          ? {
              [idPizzaCart]: {
                ...payload,
                count: 1,
                totalPrice: payload.price
              }
            }
          : {
              ...draft[payload._id],
              [idPizzaCart]: {
                ...payload,
                count: draft[payload._id][idPizzaCart]
                  ? draft[payload._id][idPizzaCart].count + 1
                  : 1,
                totalPrice: draft[payload._id][idPizzaCart]
                  ? payload.price * (draft[payload._id][idPizzaCart].count + 1)
                  : payload.price
              }
            };
      }),
    [clearCart]: () => {},
    [removeCartItem]: (state, { payload }) =>
      produce(state, (draft) => {
        draft[payload._id] = _.omit(state[payload._id], [payload.idPizza]);
      }),
    [countCartItem]: (state, { payload }) => {
      return produce(state, (draft) => {
        const price = draft[payload._id][payload.idPizza].price;

        draft[payload._id][payload.idPizza].count = payload.count;
        draft[payload._id][payload.idPizza].totalPrice = payload.count * price;
      });
    }
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
