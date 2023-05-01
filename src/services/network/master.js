import { api, BASE_API } from '.';
import { log } from '../utils';

export class MasterService {
  static endpoints = {
    add: '/master/add',
    edit: '/master/edit',
    remove: '/master/remove',
    addWeekSlot: '/master/addWeekSlot',
    addSlot: '/master/addSlot',
    disableSlot: '/master/disableSlot',
    getMasterProcedure: '/master/getMasterProcedure',
    getById: '/master/getById',
    getAll: '/master/getAll',
  };

  static async add(name = '', procedure = [], slots = []) {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.add}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify({ name, procedure, slots }),
      });

      log('api-success', '[MASTER] Add', data);
    } catch (error) {
      log('api-error', '[MASTER] Add: ', error);
      throw error;
    }
  }
  static async editMaster(id, name = '', procedure = [], slots = []) {
    try {
      const data = await api.patch(`${BASE_API}${this.endpoints.edit}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify({
          id,
          name,
          procedure,
          slots
        }),
      });

      log('api-success', '[MASTER] Edit', data);
    } catch (error) {
      log('api-error', '[MASTER] Edit: ', error);
      throw error;
    }
  }

  static async deleteMaster(master = {}) {
    try {
      const data = await api.put(`${BASE_API}${this.endpoints.remove}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify(master),
      });

      log('api-success', '[MASTER] Remove', data);
    } catch (error) {
      log('api-error', '[MASTER] Remove: ', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get(`${BASE_API}${this.endpoints.getAll}`);
      const data = await response.json();
      log('api-success', '[MASTER] getAllMaster', data);
      return data;
    } catch (error) {
      log('api-error', '[MASTER] getAllMaster: ', error);
      throw error;
    }
  }
}
