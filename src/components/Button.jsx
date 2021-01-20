import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, className, outline, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={ClassNames('button', className, {
                'button--outline': outline,
            })}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.array,
    className: PropTypes.string,
    outline: PropTypes.bool,
    onClick: PropTypes.func,
};
Button.defaultProps = { children: [], className: '', outline: false, onClick: () => {} };

export { Button };
