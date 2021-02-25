import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchPizzas } from '../api';
import { getFilters, getPizzasRefresh } from '../redux/reducers';
import { setFetchPizzas, setPizzas, setLoaded, setRefresh } from '../redux/actions';

export function* loadPizzas() {
  try {
    const refresh = yield select(getPizzasRefresh);

    if (refresh) {
      yield put(setLoaded(false));
      const { sortBy, category } = yield select(getFilters);
      const pizzas = yield call(fetchPizzas, category, sortBy);
      yield put(setPizzas(pizzas));
    }
    yield put(setRefresh(true));
  } catch (error) {}
}

export function* pizzasWatch() {
  yield takeLatest(setFetchPizzas, loadPizzas);
}
