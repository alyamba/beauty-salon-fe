import React from 'react';
import './CustomError.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const CustomError = () => {
  return (
    <div className="error__container">
      <div className="header-error__conatiner">
        <p className="logo">Bloom</p>
        <Link to="/home">
          <Button text="Home" style="headerLink" />
        </Link>
      </div>
      <hr />
      <p className="error-text">Ошибка 404</p>
      <p className="error-text">Страница не найдена</p>
      <hr />
      <p className="apology-text">Приносим свои извинения...</p>
      <p className="apology-text">
        Возможно, вы сможете вернуться на эту страницу позже.
      </p>
    </div>
  );
};

export default CustomError;
