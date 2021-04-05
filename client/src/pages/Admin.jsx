import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setFetchPizzasForAdmin, setRefresh } from '../redux/actions';
import { getPizzasAdmin } from '../redux/reducers';
import { Button, AdminPizza, PopUpHoc, PopupForm } from '../components';

const Admin = ({ activePopup, openPopup, closePopup, popupRef }) => {
  const pizzas = useSelector((state) => getPizzasAdmin(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFetchPizzasForAdmin());
    dispatch(setRefresh(false));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="admin-panel">
        <div className="admin-panel__top">
          <h2>Админ-панель</h2>
          <Button onClick={openPopup} className="button--add" outline>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Создать пиццу</span>
          </Button>
        </div>
        <div className="admin-panel__items">
          {pizzas.map(({ _id, imageUrl, name, types, sizes, category, rating, description }) => {
            return (
              <AdminPizza
                _id={_id}
                imageUrl={imageUrl}
                name={name}
                types={types}
                sizes={sizes}
                key={_id}
                category={category}
                rating={rating}
                description={description}
              />
            );
          })}
        </div>
      </div>
      <PopupForm
        imageUrl=""
        name=""
        types=""
        sizes=""
        category=""
        rating={1}
        description=""
        popupRef={popupRef}
        closePopup={closePopup}
        activePopup={activePopup}
        typeAction="add"
      />
    </div>
  );
};

const AdminWrapped = () => {
  const HOC = PopUpHoc(Admin);
  return <HOC />;
};

Admin.propTypes = {
  activePopup: PropTypes.bool,
  openPopup: PropTypes.func,
  closePopup: PropTypes.func,
  popupRef: PropTypes.object
};

Admin.dafaultProps = {
  activePopup: true,
  openPopup: () => {},
  closePopup: () => {},
  popupRef: {}
};

export { AdminWrapped as Admin };
