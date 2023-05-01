import React from 'react';
import { Footer, Header } from '../components';
import { LOCAL_STORAGE_KEYS } from '../services/network';

const AccountPage = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  return (
    <div>
      <Header />
      <main>
        <div className="about-user__container">
          <p className="title">Информация о Вашем аккаунте</p>
          <p>
            {userData.name} {userData.surname}
          </p>
          <p>Email: {userData.email}</p>
        </div>
        <div>
          <p className="title">Информация о Ваших заказах</p>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
