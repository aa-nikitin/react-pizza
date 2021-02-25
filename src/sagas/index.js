import { fork } from 'redux-saga/effects';

// import { addTicket } from './tickets';
import { pizzasWatch } from './pizzas';

export function* sagas() {
  yield fork(pizzasWatch);
}
