import React from 'react';
import './Button.scss';

const Button = ({ text, style = '', onPress = () => {} }) => {
  return (
    <button className={style} onClick={onPress}>
      {text}
    </button>
  );
};

export default Button;
