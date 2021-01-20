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
          items.map((item, index) => {
            return (
              <li
                className={index === activeCategory ? 'active' : ''}
                onClick={() => onClickCategory(index)}
                key={`${item}_${index}`}>
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string),
  onClickCategory: PropTypes.func
};
Categories.defaultProps = { activeCategory: null, items: [], onClickCategory: () => {} };

export { Categories };
