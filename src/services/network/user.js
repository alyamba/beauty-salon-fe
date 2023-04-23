import { api, BASE_API } from '.';
import { log } from '../utils';

export class UserService {
  static endpoints = {
    register: '/user/register',
    login: '/user/login',
  };

  static async register(
    email = '',
    password = '',
    name = '',
    surname = '',
    // id = null,
    // token = null,
  ) {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.register}`, {
        body: JSON.stringify({ email, password, name, surname }),
      });

      log('api-success', '[USER] Register', data);
    } catch (error) {
      log('api-error', '[USER] Register: ', error);
      throw error;
    }
  }

  static async login(email = '', password = '') {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.login}`, {
        body: JSON.stringify({ email, password }),
      });

      log('api-success', '[USER] Login', data);
    } catch (error) {
      log('api-error', '[USER] Login: ', error);
      throw error;
    }
  }
}
