import axios from 'axios';

export const fetchPizzas = (category, sortBy) =>
  axios
    .get(
      `/api/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => data);

export const fetchChangePizzas = (obj, id, typeAction) =>
  axios
    .post(`/api/pizzas${typeAction === 'edit' ? `/${id}` : ''}`, obj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => data.message)
    .catch((e) => {
      throw e.response.data;
    });
export const fetchDeletePizzas = (id) => axios.delete(`/pizzas/${id}`).then(({ data }) => data);
