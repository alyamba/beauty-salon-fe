import React from 'react';
import './HomeMainLayout.scss';

const HomeMainLayout = ({ textContent, imgTage, type = 'direct' }) => {
  return (
    <div className={type}>
      <div className="img__container">{imgTage}</div>
      <p className="information">{textContent}</p>
    </div>
  );
};

export default HomeMainLayout;
