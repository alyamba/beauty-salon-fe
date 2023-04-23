import './Input.scss';
import React from 'react';

const Input = (placeholder, setValue = () => {}, value, type) => {
  return (
    <input
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      className={type}
    />
  );
};

export default Input;
