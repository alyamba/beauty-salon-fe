import { api, BASE_API } from '.';
import { log } from '../utils';

export class ProcedureService {
  static endpoints = {
    add: '/procedure/add',
    edit: '/procedure/edit',
    remove: '/procedure/edit',
    getAllByCategory: '/procedure/getAllByCategory',
  };

  static async add() {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.add}`, {
        body: JSON.stringify({}),
      });

      log('api-success', '[PROCEDURE] Add', data);
    } catch (error) {
      log('api-error', '[PROCEDURE] Add: ', error);
      throw error;
    }
  }
}
