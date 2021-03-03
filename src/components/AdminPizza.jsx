import React from 'react';

import { PopUpHoc, PopupForm } from './';

const AdminPizza = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  category,
  rating,
  activePopup,
  openPopup,
  closePopup,
  popupRef
}) => {
  // console.log(types);
  return (
    <>
      <div className="admin-panel__item admin-pizza" key={id}>
        <div className="admin-pizza__img">
          <img className="admin-pizza__image" src={imageUrl} alt={name} />
        </div>
        <div className="admin-pizza__info">
          <h3 className="admin-pizza__name">{name}</h3>
          <div className="admin-pizza__controls">
            <button onClick={openPopup} className="admin-pizza__control">
              Редактировать
            </button>
            <button className="admin-pizza__control">Удалить</button>
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
        popupRef={popupRef}
        closePopup={closePopup}
        activePopup={activePopup}
      />
    </>
  );
};

const AdminPizzaWrapped = ({ id, imageUrl, name, types, sizes, category, rating }) => {
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
      key={id}
    />
  );
};

export { AdminPizzaWrapped as AdminPizza };
