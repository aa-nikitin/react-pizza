import axios from 'axios';

export const fetchPizzas = (category, sortBy) =>
  axios
    .get(
      `http://localhost:8080/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => data);
