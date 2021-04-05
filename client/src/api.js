import axios from 'axios';

export const fetchPizzas = (category, sortBy) =>
  axios
    .get(
      `/api/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => data);

export const fetchChangePizzas = (obj, _id, typeAction) => {
  if (typeAction === 'edit')
    return axios
      .put(`/api/pizzas/${_id}`, obj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => data)
      .catch((e) => {
        throw e.response.data;
      });
  else
    return axios
      .post(`/api/pizzas`, obj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => data)
      .catch((e) => {
        throw e.response.data;
      });
};
export const fetchDeletePizzas = (_id) =>
  axios.delete(`/api/pizzas/${_id}`).then(({ data }) => data);
