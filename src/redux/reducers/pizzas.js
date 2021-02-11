import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setLoaded, setPizzas } from '../actions';

const isLoaded = handleActions(
  {
    [setLoaded]: (_state, { payload }) => payload,
    [setPizzas]: () => true
  },
  false
);

const items = handleActions(
  {
    [setPizzas]: (_state, { payload }) => payload
  },
  []
);

export const getPizzas = ({ pizzas }) => pizzas;

export default combineReducers({ isLoaded, items });
