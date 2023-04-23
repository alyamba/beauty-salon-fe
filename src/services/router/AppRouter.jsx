import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '../../pages';

export const ROUTE_PATH = {
  login: '/login',
  register: '/register',
  home: '/home',
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.home} element={<HomePage />} />
      <Route path={ROUTE_PATH.login} element={<LoginPage />} />
      <Route path={ROUTE_PATH.register} element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
