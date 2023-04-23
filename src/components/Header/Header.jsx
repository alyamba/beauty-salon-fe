import React from 'react';
import './Header.scss';
import Button from '../Button/Button';

const Header = () => {
  return (
    <nav>
      <p className="logo">Bloom</p>
      <div>
        <Button text="Home" style="headerLink" />
        <Button text="Услуги" style="headerLink" />
        <Button text="Аккаунт" style="headerLink" />
      </div>
      <Button text='ВОЙТИ' style='mainBtn headerMainBtn'/>
    </nav>
  );
};

export default Header;
