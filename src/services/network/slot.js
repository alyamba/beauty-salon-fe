import { api, BASE_API } from '.';
import { log } from '../utils';

export class SlotService {
  static endpoints = {
    createSlots: '/slot/createSlots',
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
}
