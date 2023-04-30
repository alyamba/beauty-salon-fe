import './Input.scss';
import React from 'react';

const Input = ({
  value,
  setValue = () => {},
  placeholder,
  type,
  style ,
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      type={type}
      className={style}
    />
  );
};

export default Input;
