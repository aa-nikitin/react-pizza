import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchPizzas, fetchChangePizzas, fetchDeletePizzas } from '../api';
import { getFilters, getPizzasRefresh, getPizzas } from '../redux/reducers';
import {
  setFetchPizzas,
  saveFetchPizza,
  deletePizza,
  setPizzas,
  setLoaded,
  setRefresh,
  deletePizzasForAdmin,
  changePizzasForAdmin,
  addPizzasForAdmin
} from '../redux/actions';

export function* loadPizzas() {
  try {
    const refresh = yield select(getPizzasRefresh);
    const { items: pizzasOld } = yield select(getPizzas);

    if (refresh || !pizzasOld.length) {
      yield put(setLoaded(false));
      const { sortBy, category } = yield select(getFilters);
      const pizzas = yield call(fetchPizzas, category, sortBy);
      yield put(setPizzas(pizzas));
    }
    if (!refresh) yield put(setRefresh(true));
  } catch (error) {
    console.log(error);
  }
}

export function* addPizza({
  payload: {
    _id,
    imagePizza,
    namePizza,
    priceThick,
    priceThin,
    priceSize26,
    priceSize30,
    priceSize40,
    categoryPizza,
    raitingPizza,
    typeAction,
    description
  }
}) {
  try {
    const formData = new FormData();
    formData.append('images', imagePizza);
    formData.append('name', namePizza);
    formData.append('priceThin', Number(priceThin));
    formData.append('priceThick', Number(priceThick));
    formData.append('priceSize26', Number(priceSize26));
    formData.append('priceSize30', Number(priceSize30));
    formData.append('priceSize40', Number(priceSize40));
    formData.append('categoryPizza', categoryPizza);
    formData.append('raitingPizza', raitingPizza);
    formData.append('description', description);
    const pizza = yield call(fetchChangePizzas, formData, _id, typeAction);
    const pizzaMsg =
      typeAction === 'edit'
        ? `Пицца "${pizza.name}" успешно изменена`
        : `Пицца "${pizza.name}" успешно добавлена`;
    if (pizza.name) {
      alert(pizzaMsg);
      if (typeAction === 'edit') yield put(changePizzasForAdmin(pizza));
      else yield put(addPizzasForAdmin(pizza));
    }
  } catch (error) {
    alert(error.message);
  }
}

export function* delPizza({ payload }) {
  try {
    if (window.confirm('Вы действительно хотите удалить пиццу?')) {
      yield call(fetchDeletePizzas, payload);
      yield put(deletePizzasForAdmin(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* pizzasWatch() {
  yield takeLatest(setFetchPizzas, loadPizzas);
  yield takeLatest(saveFetchPizza, addPizza);
  yield takeLatest(deletePizza, delPizza);
}
