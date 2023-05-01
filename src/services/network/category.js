import { api, BASE_API } from '.';
import { log } from '../utils';

export class CategoryService {
  static endpoints = {
    add: '/category/add',
    getAll: '/category/getAll',
  };

  static async add(name = '') {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.add}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify({ name }),
      });
      log('api-success', '[CATEGORY] Add', data);
    } catch (error) {
      log('api-error', '[CATEGORY] Add: ', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get(`${BASE_API}${this.endpoints.getAll}`);
      const data = await response.json();
      log('api-success', '[CATEGORY] getAllCategory', data);
      return data;
    } catch (error) {
      log('api-error', '[CATEGORY] getAllCategory: ', error);
      throw error;
    }
  }
}
