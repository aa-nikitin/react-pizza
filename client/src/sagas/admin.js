import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPizzas } from '../api';
import { setFetchPizzasForAdmin, setPizzasForAdmin } from '../redux/actions';

export function* loadPizzasAdmin() {
  try {
    const pizzas = yield call(fetchPizzas, null, 'popular');
    yield put(setPizzasForAdmin(pizzas));
  } catch (error) {}
}

export function* adminWatch() {
  yield takeLatest(setFetchPizzasForAdmin, loadPizzasAdmin);
}
