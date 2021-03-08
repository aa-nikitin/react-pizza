import axios from 'axios';

export const fetchPizzas = (category, sortBy) =>
  axios
    .get(
      `http://localhost:8080/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => data);

export const fetchChangePizzas = (obj, id, typeAction) =>
  typeAction === 'edit'
    ? axios.put(`http://localhost:8080/pizzas/${id}`, obj).then(({ data }) => data)
    : axios.post(`http://localhost:8080/pizzas`, obj).then(({ data }) => data);

export const fetchDeletePizzas = (id) =>
  axios.delete(`http://localhost:8080/pizzas/${id}`).then(({ data }) => data);
