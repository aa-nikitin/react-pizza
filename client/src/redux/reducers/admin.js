import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  setPizzasForAdmin,
  deletePizzasForAdmin,
  changePizzasForAdmin,
  addPizzasForAdmin
} from '../actions';

const pizzas = handleActions(
  {
    [setPizzasForAdmin]: (_state, { payload }) => payload,
    [deletePizzasForAdmin]: (state, { payload }) => state.filter((item) => item._id !== payload),
    [changePizzasForAdmin]: (state, { payload }) =>
      state.map((item) => (item._id === payload._id ? payload : item)),
    [addPizzasForAdmin]: (state, { payload }) => [...state, payload]
  },
  []
);

export const getPizzasAdmin = ({ admin }) => admin.pizzas;

export default combineReducers({ pizzas });
