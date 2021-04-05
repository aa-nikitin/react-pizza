import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from '../';
import { avalibleTypes, pizzaImgStub } from '../../constants';

const PizzaBlock = ({
  _id,
  imageUrl,
  name,
  types,
  sizes,
  description,
  onClickAddPizza,
  addedCount
}) => {
  const [activeType, setActiveType] = useState(types.filter((type) => type.price > 0)[0]);
  const [activeSize, setActiveSize] = useState(sizes.filter((size) => size.price > 0)[0]);
  const sumPrice = () => activeType.price + activeSize.price;
  const onSelectType = (index) => {
    setActiveType(index);
  };
  const onSelectSize = (index) => {
    setActiveSize(index);
  };
  const onAddPizza = () => {
    const obj = {
      _id,
      name,
      imageUrl,
      price: sumPrice(),
      size: activeSize,
      type: activeType
    };
    onClickAddPizza(obj);
  };
  const idPizzaCart = `${activeType.id}-${activeSize.id}`;

  return (
    <div className="pizza-block">
      <div className="pizza-block__top">
        <img className="pizza-block__image" src={imageUrl ? imageUrl : pizzaImgStub} alt={name} />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__descr">{description}</div>
      </div>
      <div className="pizza-block__footer">
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => {
              return (
                <li
                  key={type.id}
                  className={classNames({
                    active: activeType.id === type.id,
                    disabled: type.price <= 0
                  })}
                  onClick={() => onSelectType(type)}>
                  {avalibleTypes[type.id]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size) => {
              return (
                <li
                  key={size.id}
                  className={classNames({
                    active: activeSize.id === size.id,
                    disabled: size.price <= 0
                  })}
                  onClick={() => onSelectSize(size)}>
                  {size.id} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{sumPrice()} ₽</div>
          <Button onClick={onAddPizza} className="button--add" outline>
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
            <span>Добавить</span>
            {addedCount && addedCount[idPizzaCart] && <i>{addedCount[idPizzaCart].count}</i>}
          </Button>
        </div>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  sizes: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  onClickAddPizza: PropTypes.func,
  addedCount: PropTypes.object
};

PizzaBlock.dafaultProps = {
  id: '',
  imageUrl: '',
  name: '---',
  types: [],
  sizes: [],
  description: '',
  onClickAddPizza: () => {},
  addedCount: {}
};

export { PizzaBlock };
