import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, className, outline, onClick, ...params }) => {
  return (
    <button
      onClick={onClick}
      className={ClassNames('button', className, {
        'button--outline': outline
      })}
      {...params}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  outline: PropTypes.bool,
  onClick: PropTypes.func
};
Button.defaultProps = { className: '', outline: false, onClick: () => {} };

export { Button };
