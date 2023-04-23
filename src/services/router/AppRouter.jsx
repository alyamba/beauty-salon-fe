import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../../pages';

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
    </Routes>
  );
};

export default AppRouter;
