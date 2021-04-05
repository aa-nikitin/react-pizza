import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { PopUpHoc, PopupForm } from './';
import { pizzaImgStub } from '../constants';
import { deletePizza } from '../redux/actions';

const AdminPizza = ({
  _id,
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
    dispatch(deletePizza(_id));
  };
  return (
    <>
      <div className="admin-panel__item admin-pizza" key={_id}>
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
        _id={_id}
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

const AdminPizzaWrapped = ({
  _id,
  imageUrl,
  name,
  types,
  sizes,
  category,
  rating,
  description
}) => {
  const HOC = PopUpHoc(AdminPizza);
  return (
    <HOC
      _id={_id}
      name={name}
      types={types}
      sizes={sizes}
      imageUrl={imageUrl}
      category={category}
      rating={rating}
      description={description}
      key={_id}
    />
  );
};

AdminPizza.propTypes = {
  _id: PropTypes.string,
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
  _id: '',
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
  _id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  sizes: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  category: PropTypes.number,
  rating: PropTypes.number
};

AdminPizzaWrapped.dafaultProps = {
  _id: '',
  imageUrl: '',
  name: '---',
  types: [],
  sizes: [],
  description: '',
  category: 0,
  rating: 0
};

export { AdminPizzaWrapped as AdminPizza };
