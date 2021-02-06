import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { addPizzaToCart } from '../redux/actions/cart';
import { setFetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' }
];

const Home = () => {
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();
  const onClickCategory = useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );
  const onClickSortType = useCallback(
    (index) => {
      dispatch(setSortBy(index));
    },
    [dispatch]
  );
  const handleAddPizzaToCart = (obj) => {
    // console.log(obj);
    dispatch(addPizzaToCart(obj));
  };
  useEffect(() => {
    dispatch(setFetchPizzas(category, sortBy));
  }, [category, sortBy, dispatch]);
  // console.log(cartItems);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onClickCategory}
          items={categoryNames}
        />
        <SortPopup onClickSortType={onClickSortType} activeSortType={sortBy} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas.map((item) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={item.id}
                addedCount={cartItems[item.id] && cartItems[item.id].items.length}
                {...item}
              />
            ))
          : Array(12)
              .fill(null)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
};

Home.propTypes = { pizzas: PropTypes.array };
Home.defaultProps = { pizzas: [] };

export { Home };
