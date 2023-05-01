import './CheckboxRaw.scss';
import React, { useState } from 'react';

const CheckboxRaw = ({ id, title, isSelected, style, onChange = () => {} }) => {
  const handleOnChangeCheckbox = () => {
    onChange(id);
  };

  return (
    <div onClick={handleOnChangeCheckbox} className="checkbox-raw-container">
      <input
        checked={isSelected}
        type="checkbox"
        id="checkbox"
        className={style}
      />
      <p className="checkbox-raw-title">{title}</p>
    </div>
  );
};

export default CheckboxRaw;
