import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  CustomErrorPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ProceduresPage,
  AccountPage,
  LoginAdminPage,
  MastersPage,
  CategoriesPage,
} from '../../pages';

export const ROUTE_PATH = {
  login: '/login',
  register: '/register',
  home: '/home',
  procedures: '/procedures',
  account: '/account',
  admin: '/admin',
  masters: '/masters',
  categories: '/categories',
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.home} element={<HomePage />} />
      <Route path={ROUTE_PATH.login} element={<LoginPage />} />
      <Route path={ROUTE_PATH.register} element={<RegisterPage />} />
      <Route path={ROUTE_PATH.procedures} element={<ProceduresPage />} />
      <Route path={ROUTE_PATH.account} element={<AccountPage />} />
      <Route path={ROUTE_PATH.admin} element={<LoginAdminPage />} />
      <Route path={ROUTE_PATH.masters} element={<MastersPage />} />
      <Route path={ROUTE_PATH.categories} element={<CategoriesPage />} />
      <Route path="*" element={<CustomErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
