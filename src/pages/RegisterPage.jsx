import React, { useState } from 'react';
import { Button, Footer, Header, Input } from '../components';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  return (
    <div>
      <Header />
      <main>
        <div className="form__container">
          <p className="title">Добро пожаловать, тут ты можешь создать новый аккаунт!</p>
          <Input
            placeholder="Имя"
            setValue={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
          <Input
            placeholder="Фамилия"
            setValue={(e) => setSurname(e.target.value)}
            value={surname}
            type="text"
          />
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
          <Button text="Создать" style="mainBtn" />
          <p className="paragraph-small">У тебя уже есть аккаунт?</p>
          <Link to="/login" style={{ color: 'black', padding: '4px' }}>
            <p className="paragraph-small">Войди здесь</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
