import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { PopUpHoc, PopupForm } from './';
import { pizzaImgStub } from '../constants';
import { deletePizza } from '../redux/actions';

const AdminPizza = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  category,
  rating,
  description,
  activePopup,
  openPopup,
  closePopup,
  popupRef
}) => {
  const dispatch = useDispatch();
  const delPizza = () => {
    dispatch(deletePizza(id));
  };
  return (
    <>
      <div className="admin-panel__item admin-pizza" key={id}>
        <div className="admin-pizza__img">
          <img className="admin-pizza__image" src={imageUrl ? imageUrl : pizzaImgStub} alt={name} />
        </div>
        <div className="admin-pizza__info">
          <h3 className="admin-pizza__name">{name}</h3>
          <div className="admin-pizza__controls">
            <button onClick={openPopup} className="admin-pizza__control">
              Редактировать
            </button>
            <button onClick={delPizza} className="admin-pizza__control">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <PopupForm
        id={id}
        imageUrl={imageUrl}
        name={name}
        types={types}
        sizes={sizes}
        category={category}
        rating={rating}
        description={description}
        popupRef={popupRef}
        closePopup={closePopup}
        activePopup={activePopup}
        typeAction="edit"
      />
    </>
  );
};

const AdminPizzaWrapped = ({ id, imageUrl, name, types, sizes, category, rating, description }) => {
  const HOC = PopUpHoc(AdminPizza);
  return (
    <HOC
      id={id}
      name={name}
      types={types}
      sizes={sizes}
      imageUrl={imageUrl}
      category={category}
      rating={rating}
      description={description}
      key={id}
    />
  );
};

AdminPizza.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  sizes: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  category: PropTypes.number,
  rating: PropTypes.number,
  activePopup: PropTypes.bool,
  openPopup: PropTypes.func,
  closePopup: PropTypes.func,
  popupRef: PropTypes.object
};

AdminPizza.dafaultProps = {
  id: 0,
  imageUrl: '',
  name: '---',
  types: [],
  sizes: [],
  description: '',
  category: 0,
  rating: 0,
  activePopup: true,
  openPopup: () => {},
  closePopup: () => {},
  popupRef: {}
};

AdminPizzaWrapped.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  sizes: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  category: PropTypes.number,
  rating: PropTypes.number
};

AdminPizzaWrapped.dafaultProps = {
  id: 0,
  imageUrl: '',
  name: '---',
  types: [],
  sizes: [],
  description: '',
  category: 0,
  rating: 0
};

export { AdminPizzaWrapped as AdminPizza };
