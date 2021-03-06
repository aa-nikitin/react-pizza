import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setPizzasForAdmin } from '../actions';

const pizzas = handleActions(
  {
    [setPizzasForAdmin]: (_state, { payload }) => payload
  },
  []
);

export const getPizzasAdmin = ({ admin }) => admin.pizzas;

export default combineReducers({ pizzas });
