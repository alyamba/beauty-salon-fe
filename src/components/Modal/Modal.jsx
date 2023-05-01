import React from 'react';
import './Modal.scss';

const Modal = ({
  active,
  setActive = () => {},
  onClearStates = () => {},
  children,
}) => {
  const setActiveHandler = () => {
    if (setActive) {
      setActive(false);
    }
    if (onClearStates) {
      onClearStates();
    }
  };

  return (
    <div
      className={active ? ' modal active' : 'modal'}
      onClick={setActiveHandler}
    >
      <div
        className={active ? ' modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
