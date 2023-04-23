import './Input.scss';
import React from 'react';

const Input = ({ value, setValue = () => {}, placeholder, type }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      type={type}
      className='form__input'
    />
  );
};

export default Input;
