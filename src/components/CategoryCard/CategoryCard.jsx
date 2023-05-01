import React from 'react';
import './CategoryCard.scss'

const CategoryCard = ({ id, name }) => {
  return (
    <div className="category__container">
      <p className='title'>{name}</p>
    </div>
  );
};

export default CategoryCard;
