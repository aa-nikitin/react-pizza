import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function PopUpHoc(WrappedComponent) {
  const [activePopup, setActivePopup] = useState(false);
  const popupRef = useRef();
  const openPopup = () => {
    setActivePopup(true);
  };
  const closePopup = () => {
    setActivePopup(false);
  };
  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (!path.includes(popupRef.current)) setActivePopup(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);
  return (props) => {
    return (
      <WrappedComponent
        activePopup={activePopup}
        openPopup={openPopup}
        closePopup={closePopup}
        popupRef={popupRef}
        {...props}
      />
    );
  };
}

PopUpHoc.propTypes = {
  WrappedComponent: PropTypes.func
};

PopUpHoc.dafaultProps = {
  WrappedComponent: () => {}
};

export { PopUpHoc };
