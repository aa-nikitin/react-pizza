import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Categories = memo(({ activeCategory, items, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onClickCategory(null)}>
          Все
        </li>
        {items &&
          items.map((item) => {
            return (
              <li
                className={item.value === activeCategory ? 'active' : ''}
                onClick={() => onClickCategory(item.value)}
                key={`${item.value}`}>
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  onClickCategory: PropTypes.func
};
Categories.defaultProps = { activeCategory: null, items: [], onClickCategory: () => {} };

export { Categories };
