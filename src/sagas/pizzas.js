import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchPizzas } from '../api';
import { getFilters, getPizzasRefresh, getPizzas } from '../redux/reducers';
import { setFetchPizzas, setPizzas, setLoaded, setRefresh } from '../redux/actions';

export function* loadPizzas() {
  try {
    const refresh = yield select(getPizzasRefresh);
    const { items: pizzasOld } = yield select(getPizzas);

    if (refresh || !pizzasOld.length) {
      //   console.log(refresh);
      yield put(setLoaded(false));
      const { sortBy, category } = yield select(getFilters);
      const pizzas = yield call(fetchPizzas, category, sortBy);
      yield put(setPizzas(pizzas));
    }
    if (!refresh) yield put(setRefresh(true));
  } catch (error) {}
}

export function* pizzasWatch() {
  yield takeLatest(setFetchPizzas, loadPizzas);
}
