import { api, BASE_API } from '.';
import { log } from '../utils';

export class AdminService {
  static endpoints = {
    login: '/admin/login',
  };

  static async login(password = '') {
    try {
      const response = await api.post(`${BASE_API}${this.endpoints.login}`, {
        body: JSON.stringify({ password }),
      });

      log('api-success', '[Admin] Login response', await response.text());
    } catch (error) {
      const customError = await error.response.text();
      log('api-error', '[Admin] Login: ', customError);
      throw customError;
    }
  }
}
