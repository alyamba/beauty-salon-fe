import { api, BASE_API } from '.';
import { log } from '../utils';

export class SlotService {
  static endpoints = {
    createSlots: '/slot/createSlots',
    getAll: '/slot/getAll',
  };

  static async add(date = '') {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.createSlots}`, {
        body: JSON.stringify({ date }),
      });

      log('api-success', '[SLOT] createSlots', data);
    } catch (error) {
      log('api-error', '[SLOT] createSlots: ', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get(`${BASE_API}${this.endpoints.getAll}`);
      const data = await response.json();
      log('api-success', '[SLOT] Get all', data);
      return data;
    } catch (error) {
      log('api-error', '[SLOT] Get all: ', error);
      throw error;
    }
  }
}
