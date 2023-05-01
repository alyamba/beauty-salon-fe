import { api, BASE_API } from '.';
import { log } from '../utils';

export class ProcedureService {
  static endpoints = {
    add: '/procedure/add',
    edit: '/procedure/edit',
    remove: '/procedure/remove',
    getAllByCategory: '/procedure/getAllByCategory',
    getAll: '/procedure/getAll',
  };

  static async add(
    name = '',
    description = '',
    category = {},
    slotSize = '',
    price = '',
  ) {
    try {
      const data = await api.post(`${BASE_API}${this.endpoints.add}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify({ name, description, category, slotSize, price }),
      });

      log('api-success', '[PROCEDURE] Add', data);
    } catch (error) {
      log('api-error', '[PROCEDURE] Add: ', error);
      throw error;
    }
  }
  static async editProcedure(
    id,
    name = '',
    description = '',
    category = {},
    slotSize = '',
    price = '',
  ) {
    try {
      const data = await api.patch(`${BASE_API}${this.endpoints.edit}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify({
          id,
          name,
          description,
          category,
          slotSize,
          price,
        }),
      });

      log('api-success', '[PROCEDURE] Edit', data);
    } catch (error) {
      log('api-error', '[PROCEDURE] Edit: ', error);
      throw error;
    }
  }

  static async deleteProcedure(procedure = {}) {
    try {
      const data = await api.put(`${BASE_API}${this.endpoints.remove}`, {
        headers: {
          adminPassword: '12345',
        },
        body: JSON.stringify(procedure),
      });

      log('api-success', '[PROCEDURE] Remove', data);
    } catch (error) {
      log('api-error', '[PROCEDURE] Remove: ', error);
      throw error;
    }
  }

  static async getAllByCategory(categoryId, categoryName) {
    try {
      console.log('body: ', {
        body: JSON.stringify({ id: categoryId, name: categoryName }),
      });
      const response = await api.post(
        `${BASE_API}${this.endpoints.getAllByCategory}`,
        {
          body: JSON.stringify({ id: categoryId, name: categoryName }),
        },
      );
      const data = await response.json();
      log('api-success', '[PROCEDURE] getAllByCategory', data);
      return data;
    } catch (error) {
      log('api-error', '[PROCEDURE] getAllByCategory: ', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get(`${BASE_API}${this.endpoints.getAll}`);
      const data = await response.json();
      log('api-success', '[PROCEDURE] Get All', data);
      return data;
    } catch (error) {
      log('api-error', '[PROCEDURE] Get All: ', error);
      throw error;
    }
  }
}
