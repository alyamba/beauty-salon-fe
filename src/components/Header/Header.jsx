import React from 'react';
import './Header.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <p className="logo">Bloom</p>
      <div>
        <Link to="/home">
          <Button text="Home" style="headerLink" />
        </Link>
        <Button text="Услуги" style="headerLink" />
        <Button text="Аккаунт" style="headerLink" />
      </div>
      <Link to="/login">
        <Button text="ВОЙТИ" style="mainBtn headerMainBtn" />
      </Link>
    </nav>
  );
};

export default Header;
