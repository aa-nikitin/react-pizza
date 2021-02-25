import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setLoaded, setPizzas, setRefresh } from '../actions';

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

const refresh = handleActions(
  {
    [setRefresh]: (_state, { payload }) => payload
  },
  true
);
export const getPizzas = ({ pizzas }) => pizzas;
export const getPizzasRefresh = ({ pizzas }) => pizzas.refresh;

export default combineReducers({ isLoaded, items, refresh });
