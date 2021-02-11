import { combineReducers } from 'redux';
import pizzas from './pizzas';
import filters from './filters';
import cart from './cart';

export * from './pizzas';
export * from './filters';
export * from './cart';

export default combineReducers({ pizzas, filters, cart });
