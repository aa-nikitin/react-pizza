import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setFetchPizzas, setCategory, setSortBy, addPizzaToCart } from '../redux/actions';
import { getPizzas, getFilters, getCartItems } from '../redux/reducers';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' }
];

const Home = (e) => {
  const { items: pizzas, isLoaded } = useSelector((state) => getPizzas(state));
  const { category, sortBy } = useSelector((state) => getFilters(state));
  const cartItems = useSelector((state) => getCartItems(state));
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
  const handleAddPizzaToCart = (obj) => dispatch(addPizzaToCart(obj));
  // const prevPizzas = usePrevious(pizzas);
  // const diffPizzas = _.isEqual(prevPizzas ? prevPizzas : [], pizzas);
  // console.log(e);
  useEffect(() => {
    dispatch(setFetchPizzas());
  }, [category, sortBy, dispatch]);

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
          ? pizzas.map((item) => {
              // console.log(cartItems[item.id]);
              return (
                <PizzaBlock
                  onClickAddPizza={handleAddPizzaToCart}
                  key={item.id}
                  addedCount={cartItems[item.id] && cartItems[item.id]}
                  {...item}
                />
              );
            })
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
