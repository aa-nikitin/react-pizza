import axios from 'axios';

export const fetchPizzas = (category, sortBy) =>
  axios
    .get(
      `/api/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => data);

export const fetchChangePizzas = (obj, id, typeAction) =>
  typeAction === 'edit'
    ? axios.put(`/pizzas/${id}`, obj).then(({ data }) => data)
    : axios.post(`/pizzas`, obj).then(({ data }) => data);

export const fetchDeletePizzas = (id) => axios.delete(`/pizzas/${id}`).then(({ data }) => data);
