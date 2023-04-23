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
      const data = await api.get(`${BASE_API}${this.endpoints.getAll}`, {
        body: JSON.stringify({}),
      });

      log('api-success', '[CATEGORY] getAll', data);
    } catch (error) {
      log('api-error', '[CATEGORY] getAll: ', error);
      throw error;
    }
  }
}
