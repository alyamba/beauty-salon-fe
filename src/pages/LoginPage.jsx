import React, { useState } from 'react';
import { Button, Footer, Header, Input } from '../components';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Header />
      <main >
        <div className='form__container'>
        <p className='title'>Добро пожаловать, войди в свой аккаунт!</p>
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
        <Button text="Войти" style='mainBtn'/>
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
