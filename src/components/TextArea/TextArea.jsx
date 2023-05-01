import React from 'react';
import './TextArea.scss';

const TextArea = ({ value, setValue = () => {}, placeholder }) => {
  return (
    <textarea placeholder={placeholder} onChange={setValue} value={value} />
  );
};

export default TextArea;
