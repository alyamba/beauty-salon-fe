import React, { useState } from 'react';
import { Button, Footer, Header, Input } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS, UserService } from '../services/network';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      console.log('PRESSED: ', process.env.NODE_ENV);
      const userData = await UserService.login(email, password);
      if (userData?.id) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
        navigate('/home');
      }
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
          <p className="title">Добро пожаловать, войди в свой аккаунт!</p>
          <Input
            placeholder="Логин"
            setValue={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <Input
            placeholder="Пароль"
            setValue={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <Button
            text="Войти"
            style="mainBtn"
            onPress={() => login(email, password)}
          />
          <p className="paragraph-small">У тебя еще нет аккаунта?</p>
          <Link to="/register" style={{ color: 'black', padding: '4px' }}>
            <p className="paragraph-small">Зарегистрируйся</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
