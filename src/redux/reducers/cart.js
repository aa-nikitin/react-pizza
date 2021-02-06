import _ from 'lodash';
import {
  ADD_PIZZA_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  COUNT_CART_ITEM /*SET_TOTAL_PRICE, SET_TOTAL_COUNT*/
} from '../constants';
const initialState = { items: {}, totalPrice: 0, totalCount: 0 };

const getTotalPrice = (arr) => arr.reduce((total, obj) => total + obj.price, 0);

const totalSum = (newItems, path) =>
  Object.keys(newItems).reduce((sum, key) => _.get(newItems[key], path) + sum, 0);

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[payload.id]
        ? [payload]
        : [...state.items[payload.id].items, payload];
      const newItems = {
        ...state.items,
        [payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems)
        }
      };
      const totalPrice = totalSum(newItems, 'totalPrice');
      const totalCount = totalSum(newItems, 'items.length');

      return {
        ...state,
        items: newItems,
        totalPrice: totalPrice,
        totalCount: totalCount
      };
    }
    case CLEAR_CART:
      return initialState;
    case REMOVE_CART_ITEM: {
      const newItems = { ...state.items };
      const currentTotalPrice = newItems[payload].totalPrice;
      const currentTotalCount = newItems[payload].items.length;
      const newCartItems = _.omit(state.items, [payload]);

      return {
        items: newCartItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount
      };
    }
    case COUNT_CART_ITEM: {
      const dropItems =
        state.items[payload.id].items.length > 1
          ? _.drop(state.items[payload.id].items)
          : [...state.items[payload.id].items];

      const newItems =
        payload.typeSymbol === 'dec'
          ? dropItems
          : [...state.items[payload.id].items, state.items[payload.id].items[0]];
      const allNewItems = {
        ...state.items,
        [payload.id]: {
          ...state.items[payload.id],
          items: newItems,
          totalPrice: getTotalPrice(newItems)
        }
      };

      return {
        ...state,
        items: allNewItems,
        totalCount: totalSum(allNewItems, 'items.length'),
        totalPrice: totalSum(allNewItems, 'totalPrice')
      };
    }
    default:
      return state;
  }
};

export default cart;
