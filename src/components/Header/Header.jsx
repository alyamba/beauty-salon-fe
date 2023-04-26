import React from 'react';
import './Header.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../services/network';

const Header = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;
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
        <Link to="/masters">
          <Button text="Мастера" style="headerLink" />
        </Link>
        {isAdmin ? (
          <Link to="/categories">
            <Button text="Категории услуг" style="headerLink" />
          </Link>
        ) : null}
        {isAuthorizedUser ? (
          <Link to="/account">
            <Button text="Аккаунт" style="headerLink" />
          </Link>
        ) : null}
      </div>
      {isAuthorizedUser || isAdmin ? (
        <Link to="/home">
          <Button
            text="ВЫЙТИ"
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
