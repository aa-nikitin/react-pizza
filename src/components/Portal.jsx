import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Portal = memo(({ id, clName, children }) => {
  const el = useRef(document.getElementById(id) || document.createElement('div'));
  const [dynamic] = useState(!el.current.parentElement);

  useEffect(() => {
    const currentElem = el.current;
    if (clName) currentElem.className = clName;
    if (dynamic) {
      currentElem.id = id;
      document.body.appendChild(currentElem);
      disableBodyScroll(currentElem);
    }

    return () => {
      if (dynamic && currentElem.parentElement) {
        currentElem.parentElement.removeChild(currentElem);
        enableBodyScroll(currentElem);
      }
    };
  }, [id, dynamic, clName]);

  return createPortal(children, el.current);
});

export { Portal };
