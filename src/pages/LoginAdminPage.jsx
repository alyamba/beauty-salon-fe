import React, { useState } from 'react';
import { Button, Footer, Header, Input } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { AdminService, LOCAL_STORAGE_KEYS } from '../services/network';

const LoginAdminPage = () => {
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async (password) => {
    try {
      console.log('PRESSED: ', process.env.NODE_ENV);
      const adminData = await AdminService.login(password);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.admin,
        JSON.stringify({ isAuth: true }),
      );
      navigate('/home');
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="form__container">
          <p className="title">Введите пароль администратора!</p>
          <Input
            placeholder="Пароль"
            setValue={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <Button
            text="Войти"
            style="mainBtn"
            onPress={() => login(password)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginAdminPage;
