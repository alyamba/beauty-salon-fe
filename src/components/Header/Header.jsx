import React from 'react';
import './Header.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../services/network';

const Header = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  return (
    <nav>
      <p className="logo">Bloom</p>
      <div>
        <Link to="/home">
          <Button text="Home" style="headerLink" />
        </Link>
        <Link to="/procedures">
          <Button text="Услуги" style="headerLink" />
        </Link>
        <Button text="Аккаунт" style="headerLink" />
      </div>
      {isAuthorizedUser ? (
        <Link to="/home">
          <Button
            text="Выйти"
            style="mainBtn headerMainBtn"
            onPress={() => {
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Link>
      ) : (
        <Link to="/login">
          <Button text="ВОЙТИ" style="mainBtn headerMainBtn" />
        </Link>
      )}
    </nav>
  );
};

export default Header;
